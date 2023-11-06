import React from "react";
import Image from "next/image";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import data from "../database/data.json";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";
// import avatar from "./../assests/avatar.svg"
const Table = () => {
  const { isLoading, isError, data, error } = useQuery("users", getUsers);
   console.log("----------------------------------------->",{error})
  if (isLoading) return <div>Employee is Loading...</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <table className="min-w-full table-auto rounded-lg m-3">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-3 py-3">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Salary</span>
          </th>
          {/* <th className="px-3 py-2">
            <span className="text-gray-200">Birthday</span>
          </th> */}
          <th className="px-3 py-2">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
};

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-200 text-center rounded-xl border-red-300 border-y-2	">
      <td className="px-2 py-2 flex flex-row items-center">
        {/* <Image
          src={avatar}
          alt="avatar"
          className="h-8 w-8 rounded-full object-cover"
          width={10}
          height={10}
        /> */}
        <span className="text-center ml-2 font-semibold">
          {name || "Unknown"}
        </span>
      </td>
      <td className="px-2 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <span>{salary || "Unknown"}</span>
      </td>
      {/* <td className="px-2 py-2">
        <span>{date || "Unknown"}</span>
      </td> */}
      <td className="px-2 py-2">
        <button className="cursor">
          <span
            className={`${
              status == "Active" ? "bg-green-500" : "bg-rose-500"
            } text-white px-5 py-1 rounded-full`}
          >
            {status || "Unknown"}
          </span>
        </button>
      </td>
      <td className="px-2 py-2 flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={"rgb(254, 211, 48)"}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
export default Table;
