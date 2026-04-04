import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useHooks/useAxiosSecure";
import { useState } from "react";
import { useParams } from "react-router-dom";
import EnrollmentSubmitionModal from "./EnrollmentSubmitionModal";
import useContexHooks from "../useHooks/useContexHooks";
import { format, parseISO } from "date-fns";
import SectionHeader from "./SectionHeader";
import FeedbackModal from "./FeedbackModal";
import PreLoader from "./PreLoader";
import { Helmet } from "react-helmet-async";

const EnrollAssignmentTable = () => {
  const { id } = useParams(); //classid
  const { user } = useContexHooks();
  const AxiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(null);
  const [modalFeedback, setmodalFeedback] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const handleOpenModal = (assignmentId) => {
    setOpenModal(assignmentId);
  };
  const closeModal = () => {
    setOpenModal(null);
  };

  // Fetch assignments for the given class
  const {
    data: assignments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["assignments", id, itemsPerPage, currentPage],
    queryFn: async () => {
      const response = await AxiosSecure.get(
        `/find-assignment/${id}?email=${user?.email}&page=${
          currentPage - 1
        }&limit=${itemsPerPage}`
      );
      return response.data;
    },
  });

  const numOfData = assignments?.length || 0;
  const numberOfPages = Math.ceil(numOfData / itemsPerPage) || 1; // 10
  const pages = [...Array(numberOfPages).keys()]; // 1,2,3...

  if (isLoading) {
    return <PreLoader />;
  }

  if (isError) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const feedbackModal = () => {
    setmodalFeedback(true);
  };
  const closeFeedbackModal = () => {
    setmodalFeedback(false);
  };

  // Handle change in items per page
  const handleItemsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" p-5">
      <Helmet>
        <title>EduHub | Class Assignment</title>
      </Helmet>
      <SectionHeader title={"Class Assignment"} />
      <button
        onClick={feedbackModal}
        className="bg-[#4CAF50] hover:bg-[#388E3C]  text-white px-6 py-3 mb-3 rounded-lg text-lg font-bold transition-all text-center"
      >
        FeedBack
      </button>
      {assignments.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full border border-[#4CAF50] ">
              {/* Table Header */}
              <thead className="bg-[#4CAF50] text-white">
                <tr>
                  <th className="text-left">#</th>
                  <th className="text-left">Title</th>
                  <th className="text-left">Description</th>
                  <th className="text-left">Deadline</th>
                  <th className="text-center">Submission</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="border">
                {assignments.map((assignment, index) => {
                  const deadlineDate = format(
                    parseISO(assignment.deadline),
                    "yyyy-MM-dd"
                  );
                  const isPastDeadline = currentDate > deadlineDate;
                  return (
                    <tr key={assignment._id}>
                      <th>{index + 1}</th>
                      <td>{assignment.title}</td>
                      <td>{assignment.description}</td>
                      <td
                        style={{
                          color: isPastDeadline ? "red" : "green",
                        }}
                      >
                        {assignment.deadline}
                      </td>
                      <td className="flex items-center space-x-2 justify-center">
                        {/* Submit Button */}
                        <button
                          disabled={isPastDeadline}
                          className="btn btn-primary btn-sm bg-[#4CAF50] border-[#4CAF50] hover:bg-green-700 font-bold hover:border-green-700"
                          onClick={() => handleOpenModal(assignment._id)}
                        >
                          Submit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pagination py-4">
            {/* Pagination Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <button
                className="btn btn-square"
                onClick={() => {
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              >
                Prev
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page + 1
                      ? `bg-[#4CAF50] hover:bg-[#388E3C] text-white px-6 py-3 rounded-lg text-lg font-medium transition-all text-center`
                      : "btn btn-outline"
                  }
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}
              <button
                className="btn btn-square"
                onClick={() => {
                  if (currentPage < numberOfPages)
                    handlePageChange(currentPage + 1);
                }}
              >
                Next
              </button>
              {/* Items Per Page Dropdown */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  name="itemsPerPage"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-red-600 font-bold text-center">
            NO Assignment Added Yet
          </p>
        </>
      )}

      {openModal && (
        <EnrollmentSubmitionModal
          refetch={refetch}
          classId={id}
          assignmentId={openModal}
          closeModal={closeModal}
        />
      )}
      {modalFeedback && (
        <FeedbackModal classId={id} closeFeedbackModal={closeFeedbackModal} />
      )}
    </div>
  );
};

export default EnrollAssignmentTable;
