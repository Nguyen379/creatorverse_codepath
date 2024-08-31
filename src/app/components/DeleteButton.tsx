"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string;
  onDelete?: () => void;
  className?: string; // Add className prop for custom styling
}

export default function DeleteButton({
  id,
  onDelete,
  className,
}: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error deleting creator:", error);
      alert("Failed to delete creator. Please try again.");
    } finally {
      setIsDeleting(false);
      setShowConfirmation(false);
      window.location.reload();
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className={
          className ||
          "bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded text-lg"
        }
      >
        Delete
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Are you sure?
            </h2>
            <p className="mb-4 text-gray-600">This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
