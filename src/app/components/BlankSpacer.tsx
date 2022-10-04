export const BlankSpacer = (props: { width?: number; height?: number }): JSX.Element => {
  return <div style={{ width: props?.width ?? 0, height: props?.height ?? 0 }}></div>;
};
