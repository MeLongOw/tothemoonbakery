import { Button, Spinner } from "@material-tailwind/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRegister } from "src/apis/user";
import { InputForm } from "src/components";
import { useUserStore } from "src/store/useUserStore";

const Register = () => {
    const { setToken } = useUserStore();
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const { name, phone, email, username, password } = data;
        const response = await apiRegister({
            name,
            phone,
            email,
            username,
            password,
        });
        if (!response.success) {
            toast.error("Tài khoản hoặc mật khẩu không đúng!", {
                theme: "dark",
            });
        }
        if (response.success) {
            toast.success("Đăng ký tài khoản thành công", {
                theme: "dark",
            });
            navigate("/login");
        }
    };
    return (
        <div className="mt-4 w-full p-4 ">
            <div className="w-full p-4 bg-card rounded-xl border-orange-main border-2 text-orange-main">
                <h4 className=" text-center w-full text-2xl font-bold">
                    Đăng Ký
                </h4>
                <div className="mt-4">
                    <form className="flex flex-col gap-4">
                        <InputForm
                            label={"Họ và tên"}
                            id="name"
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                            }}
                            errors={errors?.name?.message}
                        />
                        <InputForm
                            label={"Số điện thoại"}
                            id="phone"
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                                pattern: {
                                    value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
                                    message: "Số điện thoại không hợp lệ",
                                },
                            }}
                            errors={errors?.phone?.message}
                        />
                        <InputForm
                            label={"Email"}
                            id="email"
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                                pattern: {
                                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email không hợp lệ",
                                },
                            }}
                            errors={errors?.email?.message}
                        />
                        <InputForm
                            label={"Tài khoản"}
                            id="username"
                            register={register}
                            validate={{
                                required: "Không được bỏ trống",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Tài khoản phải có tối thiểu 6 ký tự",
                                },
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
                                minLength: {
                                    value: 8,
                                    message:
                                        "Mật khẩu phải có tối thiểu 8 ký tự",
                                },
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
                            Đăng ký
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Register;
