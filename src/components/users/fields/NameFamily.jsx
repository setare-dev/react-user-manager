import React from 'react';

const NameFamily = ({register, userEditingData, errors}) => {
    return (
        <>
            <label>نام و نام خانوادگی</label><br/>
            <input {...register("fullName")} className="w-full border p-2 rounded-sm "
                   defaultValue={userEditingData?.fullName || ''}/>
            <p className="mb-4 text-red-500">{errors.fullName?.message}</p>
        </>
    )
}

export default NameFamily;