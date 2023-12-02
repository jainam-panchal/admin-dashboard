import React, { useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes, faFastForward, faFastBackward, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Modal from "./Modal";


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

    // to handle modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDeleteSelectedClick = () => {
        setIsModalOpen(true)
    }
    const handleModalConfirmDelete = () => {
        handleMultipleDelete()
        setIsModalOpen(false)
    }
    const handleModalCancel = () => {
        setIsModalOpen(false)
    }

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
        setSelectedRows(prevRows => {
            if (!prevRows.includes(id))
                return [...prevRows, id]
            else if (!prevRows.length) {
                return []
            }
            return prevRows
        });
    }

    const handleDeleteClick = (id) => {

        const updatedData = empData.filter(emp => {

            if (emp.id == id)
                return false

            return true
        })

        setSelectedRows(prevRows => {
            const newRows = prevRows.filter(pre => pre.id == id)
            return newRows
        });

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
        <div className="h-max custom-font relative overflow-x-auto shadow-md sm:rounded-lg">

            {/* Confirmtion Modal  */}
            {isModalOpen && (
                <Modal
                    title={
                        selectedRows.length > 1
                            ? "Multiple Delete"
                            : "Selected Delete"}
                    count={selectedRows.length}
                    caption={
                        selectedRows.length > 1
                            ? `Are you sure you want to delete all ${selectedRows.length} entries?`
                            : `Are you sure you want to delete the selected entry?`
                    }
                    handleModalConfirmDelete={handleModalConfirmDelete}
                    handleModalCancel={handleModalCancel}
                />
            )}


            <div className="mb-2 text-sm font-medium text-gray-900 flex justify-between px-3 py-2 gap-3">

                {/* Searchbox */}
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="searchbar block w-full shadow-md px-3 py-3 ps-10 text-gray-900 border border-gray-200 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Delete Selected Rows  */}
                <div className="footer-info flex justify-center items-center">
                    <button onClick={handleDeleteSelectedClick} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-md  hover:bg-red-500 sm:ml-3 sm:w-auto">Delete Selected</button>
                </div>

            </div>


            {/* Table Content  */}
            <div className="overflow-x-auto">
                <table id="dashboard-table" className=" px-2 border mx-auto text-left  rtl:text-right text-gray-500 table-auto w-[98%]">

                    {/* Table Head  */}
                    <thead id="dashboard-table-head" className="dashboard-table-head shadow-sm text-xs text-gray-950 uppercase bg-gray-50">
                        <tr>
                            {/* Select all checkbox */}
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
                                        checked={selectedRows.length == 0 ? false : 'undefined'}
                                    />
                                </div>
                                {console.log('Hello From jainam Panchal')}
                            </th>

                            {/* Table Headings  */}
                            <th scope="col" id="header-id" className=" px-2 font-center w-1/12 text-center"> ID </th>
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
                            <th scope="col" className=" text-center px-6 py-2 w-3/12">
                                <span className="">Actions</span>
                            </th>

                        </tr>
                    </thead>

                    {/* Table Body  */}
                    <tbody className="dashboard-table-body">
                        {

                            currentItems.map(emp => {

                                // IF EDITING ON CURRENT COLUMN
                                if (emp.id == editOnId)
                                    return (
                                        <tr key={emp.id} className="border-b bg-blue-200 ">
                                            <td className="w-1/12">

                                                {/* Selection checkbox  */}
                                                <div className="flex m-3 justify-center items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out m-2"
                                                        checked={selectedRows.includes(emp.id) || emp.id == editOnId}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setSelectedRows(prevRows => [...prevRows, emp.id]);
                                                            } else {
                                                                handleCancelClick()
                                                                setSelectedRows(prevRows => prevRows.filter(id => id !== emp.id));
                                                            }
                                                        }}
                                                    />

                                                </div>
                                            </td>

                                            {/* Employee ID  */}
                                            <td className="w-1/12 mx-auto px-6 text-center">
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


                                            <td className="flex justify-center gap-4 px-6 py-4 text-center">

                                                {/* SAVE BUTTON */}
                                                <a onClick={() => handleSaveClick(emp.id)} className="button-save font-medium  text-blue-600  hover:underline"><FontAwesomeIcon className="border border-gray-1000 p-1 rounded-md" icon={faSave} /></a>

                                                {/* CANCEL BUTTON */}
                                                <a onClick={handleCancelClick} className="button-cancel font-medium text-red-600  hover:underline"><FontAwesomeIcon className="border border-gray-1000 p-1 rounded-md items-center" icon={faTimes} /></a>

                                            </td>
                                        </tr>
                                    )
                                else {

                                    let highLightedStyles = " border-b text-gray-600 bg-blue-200 border-b"
                                    let styles = "border-b text-gray-600 border-b"

                                    return (
                                        <tr key={emp.id} className={selectedRows.includes(emp.id) ? highLightedStyles : styles}>
                                            <td>

                                                {/* Single Select Checkbox  */}
                                                <div className="flex mx-3 justify-center items-center">
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
                                            <td className="mx-auto  text-center w-1/12">
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
                                            <td className="flex flex-col sm:flex-row justify-center gap-4 px-6 py-4 text-center">
                                                <a onClick={() => handleEditClick(emp.id)} className="button-edit text-blue-600 hover:underline">
                                                    <FontAwesomeIcon className="border border-gray-1000 p-1 rounded-md" icon={faEdit} />
                                                </a>
                                                <a onClick={() => handleDeleteClick(emp.id)} className="button-delete text-red-600 hover:underline">
                                                    <FontAwesomeIcon className="border border-gray-1000 p-1 rounded-md" icon={faTrash} />
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>


            <div className="footer flex justify-between px-6 py-2 text-sm ">

                {/* SELECTED ROWS INFO */}
                <div className="footer-info flex justify-center items-center">
                    <p className="mr-3">{selectedRows.length} out of {filteredData.length} selected</p>
                    {/* <button onClick={handleDeleteSelectedClick} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete Selected</button> */}
                </div>

                {/* NAVIGATION CONTROLS */}
                <div className="page-navigations flex justify-center items-center my-2">
                    <div className="page-nav-buttons flex gap-2">

                        {/* Current Page  */}
                        <p className="mr-3"> Page {currentPage} of {totalPages} </p>


                        {/* Skip to the first page */}
                        <button id="jump-firstPage" disabled={currentPage === 1} onClick={handleJumpToFirstPage} className="bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white  px-3 hover:border-transparent rounded"><FontAwesomeIcon icon={faFastBackward} /></button>

                        {/* Go to Previous page */}
                        <button id="jump-prevPage" onClick={handleJumpToPrevPage} className="prev-page bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white px-3  hover:border-transparent rounded"><FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        {/* Dynamically render pages */}
                        <div className="flex items-center justify-center space-x-1 md:space-x-2 overflow-hidden h-8 md:h-auto">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber, index) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => selectPage(pageNumber)}
                                    className={`w-6 h-6 flex items-center justify-center rounded-full ${pageNumber === currentPage ? 'bg-blue-200 hover:bg-blue-500 ' : ''} ${index < 3 || index >= totalPages - 3 ? '' : 'hidden md:inline-flex'}`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>

                        {/* Go to Next Page */}
                        <button id="jump-nextPage" onClick={handleJumpToNextPage} className="next-page bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white  px-3 hover:border-transparent rounded">    <FontAwesomeIcon icon={faArrowRight} />
                        </button>

                        {/* Jump to Last Page */}
                        <button id="jump-lastPage" disabled={currentPage === totalPages} onClick={handleJumpToLastPage} className="last-page bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white  px-2 hover:border-transparent rounded"> <FontAwesomeIcon icon={faFastForward} />
                        </button>
                    </div>
                </div>
            </div>


        </div >

    )
}