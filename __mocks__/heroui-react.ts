module.exports = {
  Spinner: (props: any) => {
    return {
      $$typeof: Symbol.for("react.element"),
      type: "div",
      props: { "data-testid": "spinner", children: "Spinner", ...props },
    };
  },
};
