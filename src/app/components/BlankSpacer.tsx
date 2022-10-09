export const BlankSpacer = (props: {
  width?: number;
  height?: number;
  color?: string;
}): JSX.Element => {
  const colorProps = props.color !== undefined ? { backGroundColor: props.color } : {};
  return (
    <div style={{ width: props?.width ?? 0, height: props?.height ?? 0, ...colorProps }}></div>
  );
};
