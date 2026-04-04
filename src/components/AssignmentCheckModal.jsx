import PropTypes from "prop-types";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import useContexHooks from "../useHooks/useContexHooks";
import { useQuery } from "@tanstack/react-query";
import PreLoader from "./PreLoader";
import { useState } from "react";

const AssignmentCheckModal = ({ assignmentId, closeModal }) => {
  const { user } = useContexHooks();
  const AxiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: counts = [] } = useQuery({
    queryKey: ["counts", assignmentId],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/checkAssignment-count/${assignmentId}`
      );
      return res.data; // Assuming this is an array of submission objects
    },
  });
  const {
    data: submissionList = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["submissionList", assignmentId],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/checkAssignment/${assignmentId}?email=${user?.email}&page=${
          currentPage - 1
        }&limit=${itemsPerPage}`
      );
      return res.data; // Assuming this is an array of submission objects
    },
  });

  const numOfData = counts || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1;
  const pages = [...Array(numberOfPages).keys()];

  if (error) {
    return <p className="text-red-600">{error.message}</p>;
  }

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value;
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <dialog id="my_modal_4" className="modal" open>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">
            Submission Assignment Student List
          </h3>
          {isFetching ? (
            <PreLoader />
          ) : (
            <>
              {/* Dynamic Table */}
              <div className="overflow-x-auto mt-4">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Class ID</th>
                      <th>Assignment URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissionList.length > 0 ? (
                      submissionList.map((submission, index) => (
                        <tr key={submission.email || index}>
                          <td>{index + 1}</td>
                          <td>{submission.email || "N/A"}</td>
                          <td>{submission.classId || "N/A"}</td>
                          <td>
                            {submission.assignment_url ? (
                              <a
                                href={submission.assignment_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                View Assignment
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-gray-500">
                          No submissions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex flex-wrap gap-2 justify-center py-3">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      if (currentPage > 1) handlePageChange(currentPage - 1);
                    }}
                  >
                    Prev
                  </button>
                  {pages.map((page) => (
                    <button
                      key={page}
                      className={`btn btn-sm ${
                        currentPage === page + 1
                          ? "bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                          : "btn-outline"
                      }`}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </button>
                  ))}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      if (currentPage < numberOfPages)
                        handlePageChange(currentPage + 1);
                    }}
                  >
                    Next
                  </button>
                  <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                  </select>
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* Close button */}
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AssignmentCheckModal;

AssignmentCheckModal.propTypes = {
  assignmentId: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
