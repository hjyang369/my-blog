import Button from "../../components/common/button";
import ClickButton from "../../components/common/clickButton";
import Input from "../../components/common/input";
import useInputValue from "../../hooks/useInputValue";

const initInputValue = {
  name: "",
  password: "",
};

export default function Login() {
  const { inputValue, handleInput } = useInputValue(initInputValue);
  return (
    <div className="mt-96">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1>MY BLOG LOGIN</h1>
        <Input handleInput={handleInput} name={"name"} width={"w-96"}></Input>
        <Input
          handleInput={handleInput}
          name={"password"}
          width={"w-96"}
        ></Input>
        <div>
          <input type="checkbox"></input>
          <span>아이디 저장</span>
        </div>
        <ClickButton
          text={"로그인"}
          fontSize={"1.2rem"}
          onclick={null}
          width={"24rem"}
        ></ClickButton>
        <ClickButton
          text={"카카오 로그인"}
          fontSize={"1.2rem"}
          onclick={null}
          width={"24rem"}
        ></ClickButton>
        <div>
          <ClickButton
            text={"아이디 찾기"}
            fontSize={"1.2rem"}
            onclick={null}
          ></ClickButton>
          <ClickButton
            text={"비밀번호 찾기"}
            fontSize={"1.2rem"}
            onclick={null}
          ></ClickButton>
          <ClickButton
            text={"회원가입"}
            fontSize={"1.2rem"}
            onclick={null}
          ></ClickButton>
        </div>
      </div>
    </div>
  );
}
