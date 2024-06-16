"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/component/shared/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}





// Feedback Toasts

const FEEDBACK_LIMIT = 1;
const FEEDBACK_REMOVE_DELAY = 1000000;

type FeedbackToastProps = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const feedbackActionTypes = {
  ADD_FEEDBACK: "ADD_FEEDBACK",
  UPDATE_FEEDBACK: "UPDATE_FEEDBACK",
  DISMISS_FEEDBACK: "DISMISS_FEEDBACK",
  REMOVE_FEEDBACK: "REMOVE_FEEDBACK",
} as const;

let feedbackCount = 0;

function generateFeedbackId() {
  feedbackCount = (feedbackCount + 1) % Number.MAX_SAFE_INTEGER;
  return feedbackCount.toString();
}

type FeedbackActionType = typeof feedbackActionTypes;

type FeedbackAction =
  | {
      type: FeedbackActionType["ADD_FEEDBACK"];
      feedback: FeedbackToastProps;
    }
  | {
      type: FeedbackActionType["UPDATE_FEEDBACK"];
      feedback: Partial<FeedbackToastProps>;
    }
  | {
      type: FeedbackActionType["DISMISS_FEEDBACK"];
      feedbackId?: FeedbackToastProps["id"];
    }
  | {
      type: FeedbackActionType["REMOVE_FEEDBACK"];
      feedbackId?: FeedbackToastProps["id"];
    };

interface FeedbackState {
  feedbacks: FeedbackToastProps[];
}

const feedbackTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addFeedbackToRemoveQueue = (feedbackId: string) => {
  if (feedbackTimeouts.has(feedbackId)) {
    return;
  }

  const timeout = setTimeout(() => {
    feedbackTimeouts.delete(feedbackId);
    feedbackDispatch({
      type: "REMOVE_FEEDBACK",
      feedbackId: feedbackId,
    });
  }, FEEDBACK_REMOVE_DELAY);

  feedbackTimeouts.set(feedbackId, timeout);
};

export const feedbackReducer = (
  state: FeedbackState,
  action: FeedbackAction
): FeedbackState => {
  switch (action.type) {
    case "ADD_FEEDBACK":
      return {
        ...state,
        feedbacks: [action.feedback, ...state.feedbacks].slice(0, FEEDBACK_LIMIT),
      };

    case "UPDATE_FEEDBACK":
      return {
        ...state,
        feedbacks: state.feedbacks.map((f) =>
          f.id === action.feedback.id ? { ...f, ...action.feedback } : f
        ),
      };

    case "DISMISS_FEEDBACK": {
      const { feedbackId } = action;

      if (feedbackId) {
        addFeedbackToRemoveQueue(feedbackId);
      } else {
        state.feedbacks.forEach((feedback) => {
          addFeedbackToRemoveQueue(feedback.id);
        });
      }

      return {
        ...state,
        feedbacks: state.feedbacks.map((f) =>
          f.id === feedbackId || feedbackId === undefined
            ? {
                ...f,
                open: false,
              }
            : f
        ),
      };
    }
    case "REMOVE_FEEDBACK":
      if (action.feedbackId === undefined) {
        return {
          ...state,
          feedbacks: [],
        };
      }
      return {
        ...state,
        feedbacks: state.feedbacks.filter((f) => f.id !== action.feedbackId),
      };
  }
};

const feedbackListeners: Array<(state: FeedbackState) => void> = [];

let feedbackMemoryState: FeedbackState = { feedbacks: [] };

function feedbackDispatch(action: FeedbackAction) {
  feedbackMemoryState = feedbackReducer(feedbackMemoryState, action);
  feedbackListeners.forEach((listener) => {
    listener(feedbackMemoryState);
  });
}

type Feedback = Omit<FeedbackToastProps, "id">;

function feedbackToast({ ...props }: Feedback) {
  const id = generateFeedbackId();

  const update = (props: FeedbackToastProps) =>
    feedbackDispatch({
      type: "UPDATE_FEEDBACK",
      feedback: { ...props, id },
    });
  const dismiss = () =>
    feedbackDispatch({ type: "DISMISS_FEEDBACK", feedbackId: id });

  feedbackDispatch({
    type: "ADD_FEEDBACK",
    feedback: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useFeedbackToast() {
  const [state, setState] = React.useState<FeedbackState>(feedbackMemoryState);

  React.useEffect(() => {
    feedbackListeners.push(setState);
    return () => {
      const index = feedbackListeners.indexOf(setState);
      if (index > -1) {
        feedbackListeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    feedbackToast,
    dismiss: (feedbackId?: string) =>
      feedbackDispatch({ type: "DISMISS_FEEDBACK", feedbackId }),
  };
}


export { useToast, toast, useFeedbackToast, feedbackToast }
