import React from 'react';
import EditGearForm from "./EditGearForm.jsx";

import {useGearStore} from "../stores/useGearStore.js";


function EditFormDialog({ onClose, initialData }) {
    const {updateGear} = useGearStore()

  return (
    <div >
      <div className="dialog-content flex flex-col justify-items-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl max-w-lg focus:outline-none bg-black z-50">
        <button className={"mt-4"} onClick={onClose}>Close</button>
        <EditGearForm data={initialData} onSubmit={(updatedData) => {

          updateGear(updatedData)
          onClose();
        }} />
      </div>
    </div>
  );
}
export default EditFormDialog;