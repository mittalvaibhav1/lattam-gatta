export const ALERT_VARIANTS = {
  ERROR: {
    variant: "error",
    hideIconVariant: false,
    autoHideDuration: 1500,
    className: "alert-error",
    anchorOrigin: { horizontal: "center", vertical: "bottom" },
    TransitionProps: {
      direction: "up"
    }
  },
  WARNING: {
    variant: "warning",
    hideIconVariant: false,
    autoHideDuration: 1500,
    className: "alert-warning",
    anchorOrigin: { horizontal: "center", vertical: "bottom" },
    TransitionProps: {
      direction: "up"
    }
  },
  SUCCESS: {
    variant: "success",
    hideIconVariant: false,
    autoHideDuration: 1500,
    className: "alert-success",
    anchorOrigin: { horizontal: "center", vertical: "bottom" },
    TransitionProps: {
      direction: "up"
    }
  },
  GAME_FINISH: {
    variant: "success",
    hideIconVariant: true,
    autoHideDuration: 5000,
    className: "alert-success",
    anchorOrigin: { horizontal: "center", vertical: "top" },
    TransitionProps: {
      direction: "down"
    }
  }
};
