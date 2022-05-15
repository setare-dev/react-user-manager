import React from 'react';

const Username = ({register, userEditingData, errors}) => {
    return (
        <>
            <label>نام کاربری</label><br/>
            <input {...register("userName")} className="w-full border   p-2 rounded-sm "
                   defaultValue={userEditingData?.userName || ''}/>
            <p className="mb-4 text-red-500">{errors.userName?.message}</p>
        </>
    )
}

export default Username;