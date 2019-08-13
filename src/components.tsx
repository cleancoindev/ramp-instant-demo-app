import React, { memo } from "react";

import styles from "./components.module.scss";
import Highlight, { defaultProps } from "prism-react-renderer";
import classnames from 'classnames';
import theme from "prism-react-renderer/themes/nightOwl";

export const BetaBanner: React.FC = () => {
  return (
    <div className={styles.betaBanner}>
      This demo app demonstrates a beta version of the Ramp Instant widget.
    </div>
  );
};

export const Code: React.FC<{ code: string }> = memo(props => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={props.code}
      language="typescript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classnames(styles.pre, className)} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <span className={styles.lineNumber}>{i + 1}</span>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
});
