import React from 'react';

const Role = ({register, userEditingData}) => {
    return (
        <>
            <label>نقش</label><br/>
            <select {...register("role")} className="w-full  p-2 border rounded-sm"
                    defaultValue={userEditingData?.role || ''}>
                <option value="user">کاربر</option>
                <option value="admin">ادمین</option>
            </select><br/>
        </>
    )
}

export default Role;