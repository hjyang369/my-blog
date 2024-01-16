import "../styles/globals.css";
import "../styles/normalize.css";
import { RecoilRoot } from "recoil";
import "../firebase/index";

const App = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
