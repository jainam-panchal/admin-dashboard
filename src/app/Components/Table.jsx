import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes, faFastForward, faFastBackward, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function Table({ empData, setEmpData }) {
    console.log("Hello HireQuotient Team!")

    // to handle search
    const [searchTerm, setSearchTerm] = useState('');
    let filteredData = empData;
    if (searchTerm) {
        filteredData = empData.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // to handle edit and save
    const [editOnId, setEditOnId] = useState(null)
    const [editedData, setEditedData] = useState({})

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


    const handleEditDataChange = (id, parameter, value) => {
        setEditedData((oldData) => {
            return {
                ...oldData,
                [parameter]: value,
            }
        })
    }

    const handleEditClick = (id) => {
        setEditOnId(id)
    }

    const handleDeleteClick = (id) => {
        const updatedData = empData.filter(emp => {

            if (emp.id == id)
                return false

            return true
        })
        setEmpData(updatedData)
    }

    const handleSaveClick = (id) => {
        const updatedData = empData.map(emp => {
            if (emp.id == id) {
                return { ...emp, ...editedData }
            }
            return emp
        })
        setEmpData(updatedData)
        setEditOnId(null)
    }

    const handleCancelClick = () => {
        setEditOnId(null)
    }

    const selectPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    const handleJumpToFirstPage = () => {
        setCurrentPage(1)
    }
    const handleJumpToLastPage = () => {
        setCurrentPage(totalPages);
    }
    const handleJumpToNextPage = () => {
        setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));
    }
    const handleJumpToPrevPage = () => {
        setCurrentPage((oldPage) => Math.max(oldPage - 1, 1));
    }


    const handleMultipleDelete = () => {
        let updatedData = empData.filter(emp => {
            if (selectedRows.includes(emp.id)) {
                return false
            }
            return true
        })
        setSelectedRows([])
        setEmpData(updatedData)
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            {/* Searchbox */}
            <div className="mb-2 text-sm font-medium text-gray-900 flex justify-between px-3 py-2 gap-3">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchbar block w-full px-3 py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Clear Searcbox Button  */}
                <button onClick={() => setSearchTerm('')} type="submit" className="button-clear text-white  bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Clear</button>

            </div>
            <table id="dashboard-table" className=" w-full text-sm text-left rtl:text-right text-gray-500">
                <thead id="dashboard-table-head" className="dashboard-table-head text-xs text-gray-950 uppercase bg-gray-50">
                    <tr>
                        <th className="w-1/12">
                            <div id="header-checkbox" className=" flex justify-center items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedRows(currentItems.map(emp => emp.id));
                                        } else {
                                            setSelectedRows([]);
                                        }
                                    }}
                                />
                            </div>
                        </th>
                        <th scope="col" id="header-id" className=" px-2 font-center w-1/12 "> ID </th>
                        <th scope="col" className="px-6 py-3 w-3/12">
                            Name
                        </th>
                        <th scope="col" id="header-email" className=" px-6 py-3 w-3/12">
                            <div className="flex items-center">
                                Email
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/12">
                            <div className="flex items-center">
                                Role
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-2 w-3/12">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="dashboard-table-body">
                    {

                        currentItems.map(emp => {

                            // IF EDITING ON CURRENT COLUMN
                            if (emp.id == editOnId)
                                return (
                                    <tr key={emp.id} className="border-b bg-blue-200 ">
                                        <td className="w-1/12">

                                            {/* Selection checkbox  */}
                                            <div className="flex justify-center items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                                    checked={selectedRows.includes(emp.id) || emp.id == editOnId}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedRows(prevRows => [...prevRows, emp.id]);
                                                        } else {
                                                            setSelectedRows(prevRows => prevRows.filter(id => id !== emp.id));
                                                        }
                                                    }}
                                                />

                                            </div>
                                        </td>

                                        {/* Employee ID  */}
                                        <td className="px-2 font-center w-1/12">
                                            {emp.id}
                                        </td>

                                        {/* Employee NAME  */}
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-600  w-3/12">
                                            <input style={{ width: '100%' }} defaultValue={emp.name} onChange={(e) => handleEditDataChange(emp.id, "name", e.target.value)} className="px-1 mx-2 border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                                        </td>

                                        {/* Employee EMAIL  */}
                                        <td className="px-6 py-4 w-3/12">
                                            <input style={{ width: '100%' }} defaultValue={emp.email} onChange={(e) => handleEditDataChange(emp.id, "email", e.target.value)} className="px-1 mx-2 border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
                                        </td>

                                        {/* Employee ROLE  */}
                                        <td className="px-6 py-4 w-1/12">
                                            <select style={{ width: '100%' }} defaultValue={emp.role} onChange={(e) => handleEditDataChange(emp.id, "role", e.target.value)} className="px-1 mx-2 border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none">
                                                <option value="admin">admin</option>
                                                <option value="member">member</option>
                                            </select>
                                        </td>


                                        <td className="px-6 py-4 text-center w-3/12">

                                            {/* SAVE BUTTON */}
                                            <a href="#" onClick={() => handleSaveClick(emp.id)} className="button-save font-medium  text-blue-600  hover:underline pr-6"><FontAwesomeIcon className="border border-gray-1000 p-1 rounded-md" icon={faSave} /></a>

                                            {/* CANCEL BUTTON */}
                                            <a href="#" onClick={handleCancelClick} className="button-cancel font-medium text-red-600  hover:underline pl-2"><FontAwesomeIcon className="border border-gray-1000 p-1 rounded-md" icon={faTimes} /></a>

                                        </td>
                                    </tr>
                                )
                            else {

                                let highLightedStyles = " border-b text-gray-600 bg-blue-200 border-b"
                                let styles = "border-b text-gray-600 border-b"

                                return (
                                    <tr key={emp.id} className={selectedRows.includes(emp.id) ? highLightedStyles : styles}>
                                        <td>
                                            <div className="flex justify-center items-center">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                                                    checked={selectedRows.includes(emp.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedRows(prevRows => [...prevRows, emp.id]);
                                                        } else {
                                                            setSelectedRows(prevRows => prevRows.filter(id => id !== emp.id));
                                                        }
                                                    }}
                                                />

                                            </div>
                                        </td>
                                        <td className="px-2 font-medium font-center">
                                            {emp.id}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium  ">
                                            {emp.name}
                                        </td>
                                        <td className="px-6 font-medium py-4">
                                            {emp.email}
                                        </td>
                                        <td className="px-6 font-medium py-4">
                                            {emp.role}
                                        </td>
                                        <td className="px-6 py-4 text-center">

                                            <a href="#" onClick={() => handleEditClick(emp.id)} className="button-edit font-medium text-blue-600 hover:underline pr-6 d-flex justify-center items-center">
                                                <FontAwesomeIcon className="border p-1 rounded-md" icon={faEdit} />
                                            </a>
                                            <a href="#" onClick={() => handleDeleteClick(emp.id)} className="button-delete font-medium text-red-600 hover:underline pl-2 d-flex justify-center items-center">
                                                <FontAwesomeIcon className="border p-1 rounded-md" icon={faTrash} />
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>

            <div className="footer flex justify-between px-6 py-2 ">

                {/* SELECTED ROWS INFO */}
                <div className="footer-info flex justify-center items-center">
                    <p className="mr-3">{selectedRows.length} out of {filteredData.length} selected</p>
                    <button onClick={handleMultipleDelete} className="bg-red-200 hover:bg-red-300 px-4 py-1 my-1 rounded-lg">Delete Selected</button>
                </div>

                {/* NAVIGATION CONTROLS */}
                <div className="page-navigations flex justify-center my-2">
                    <div className="page-nav-buttons flex gap-2">

                        {/* Skip to the first page */}
                        <button id="jump-firstPage" disabled={currentPage === 1} onClick={handleJumpToFirstPage} className="text-blue-700"><FontAwesomeIcon icon={faFastBackward} /></button>

                        {/* Go to Previous page */}
                        <button id="jump-prevPage" onClick={handleJumpToPrevPage} className="prev-page bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white px-3  hover:border-transparent rounded"><FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        {/* Dynamically render pages */}
                        <div>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => selectPage(pageNumber)}
                                    className={`w-6 rounded-full ${pageNumber === currentPage ? 'bg-blue-200 hover:bg-blue-500 ' : ''}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>

                        {/* Go to Next Page */}
                        <button id="jump-nextPage" onClick={handleJumpToNextPage} className="next-page bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white  px-3 hover:border-transparent rounded">    <FontAwesomeIcon icon={faArrowRight} />
                        </button>

                        {/* Jump to Last Page */}
                        <button id="jump-lastPage" disabled={currentPage === totalPages} onClick={handleJumpToLastPage} className="last-page text-blue-700"> <FontAwesomeIcon icon={faFastForward} />
                        </button>
                    </div>
                </div>
            </div>


        </div >

    )
}