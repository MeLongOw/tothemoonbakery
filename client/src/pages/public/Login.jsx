import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogin } from "src/apis/user";
import { InputForm } from "src/components";
import { useUserStore } from "src/store/useUserStore";

const Login = () => {
    const { setToken } = useUserStore();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const { username, password } = data;
        const response = await apiLogin({ username, password });
        if (!response.success) {
            toast.error("Tài khoản hoặc mật khẩu không đúng!", {
                theme: "dark",
            });
        }
        if (response.success) {
            toast.success("Đăng nhập thành công", {
                theme: "dark",
            });
            setToken(response.accessToken);
            navigate("/");
        }
    };
    return (
        <div className="mt-4 w-full p-4 ">
            <div className="w-full p-4 bg-card rounded-xl border-orange-main border-2 text-orange-main">
                <h4 className=" text-center w-full text-2xl font-bold">
                    Đăng nhập
                </h4>
                <div className="mt-4">
                    <form className="flex flex-col gap-4">
                        <InputForm
                            label={"Tài khoản"}
                            id="username"
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                            }}
                            errors={errors?.username?.message}
                        />
                        <InputForm
                            label={"Mật khẩu"}
                            id="password"
                            type="password"
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                            }}
                            errors={errors?.password?.message}

                        />
                    </form>
                </div>
                <div className="flex w-full justify-end mt-4">
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        color="white"
                        disabled={isSubmitting}
                    >
                        <div className="flex gap-2 items-center transition-all">
                            {isSubmitting && <Spinner className="h-3 w-3" />}
                            Đăng nhập
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
