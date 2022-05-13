

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';


const schema = yup.object({
    fullName: yup.string().required("وارد کردن نام اجباری می باشد"),
    userName: yup.string().matches(/^[a-zA-Z0-9_.-]+$/, "لطفا از کاراکتر های انگلیسی استفاده نمایید").required("وارد کردن نام کاربری اجباری می باشد"),
    email: yup.string().email("ایمیل وارد شده صحیح نمی باشد").required("وارد کردن ایمیل اجباری می باشد")
}).required();

const AddUserFrom = ({ addUser, userEditingData }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const getCurrentDate = () => {
        const today = new Date();
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
        };
        let now = today.toLocaleString("fa-IR", options);
        return now;
    };

    const onSubmit = data => {
        data = { ...data, dateCreatedAt: getCurrentDate(), id: userEditingData?.id || uuidv4() }
        console.log(data);
        addUser(data)

    }
    return (
        <form  >
            <label>نام و نام خانوادگی</label><br />
            <input {...register("fullName")} className="w-full border p-2 rounded-sm " defaultValue={userEditingData?.fullName || ''} />
            <p className="mb-4 text-red-500">{errors.fullName?.message}</p>
            <label>نام کاربری</label><br />
            <input {...register("userName")} className="w-full border   p-2 rounded-sm " defaultValue={userEditingData?.userName || ''} />
            <p className="mb-4 text-red-500">{errors.userName?.message}</p>
            <label>ایمیل</label><br />
            <input {...register("email")} className="w-full border  p-2 rounded-sm " defaultValue={userEditingData?.email || ''} />
            <p className="mb-4 text-red-500">{errors.email?.message}</p>
            <label>نقش</label><br />
            <select {...register("role")} className="w-full  p-2 border rounded-sm" defaultValue={userEditingData?.role || ''} >
                <option value="user" >کاربر</option>
                <option value="admin">ادمین</option>
            </select><br />

            <button className="bg-cyan-500 p-3 text-gray-50 rounded my-6 w-full font-bold" onClick={handleSubmit(onSubmit)}>افزودن </button>
            ‌        </form >
    );
}

export default AddUserFrom;
