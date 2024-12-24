import cn from "classnames";
import { useEffect } from "react";
// import { ToastContainer } from "react-toastify";

import customToast from "@/components/customToast";
import Zombie from "@/pages/Zombie/index";

import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    customToast.success("Mounted success!");
  }, []);

  return (
    <div className={cn("h-screen w-full bg-bgPrimaryColor")}>
      <Zombie />
      {/* <ToastContainer
        theme="dark"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable={false}
        pauseOnHover={false}
      />
      <span>{t("slogan")}</span>
      <ButtonCommon
        type={EButtonType.SIMPLE}
        onClick={() => {
          const lan = localStorage.getItem("language");
          switchLanguage(lan === "zh" ? "en-US" : "zh");
        }}
      >
        <span>切换语言</span>
      </ButtonCommon>
      <ButtonTheme /> */}
    </div>
  );
}

export default App;
