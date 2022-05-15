import React from 'react';

const Email = ({register, userEditingData, errors}) => {
    return (
        <>
            <label>ایمیل</label><br/>
            <input {...register("email")} className="w-full border  p-2 rounded-sm "
                   defaultValue={userEditingData?.email || ''}/>
            <p className="mb-4 text-red-500">{errors.email?.message}</p>
        </>
    )
}

export default Email;