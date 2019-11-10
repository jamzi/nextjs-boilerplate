import ReactGA from "react-ga";

export const initGA = () => {
  if (
    !(
      process.env.NODE_ENV !== "production" &&
      process.env.GOOGLE_ANALYTICS_TRACKER_ID
    )
  ) {
    return;
  }
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKER_ID);
};
export const logPageView = () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};
