import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  errStatus: string;
}

const html = `
<html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          })

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err)
            }
          }, false);
        </script>
      </body>
    </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, errStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 100);
  }, [code]);

  return (
    <div className="iframe-wrapper">
      <iframe
        width="100%"
        ref={iframe}
        srcDoc={html}
        title="code preview"
        sandbox="allow-scripts"
      />
      {errStatus && <div className="preview-error">{errStatus}</div>}
    </div>
  );
};

export default Preview;
