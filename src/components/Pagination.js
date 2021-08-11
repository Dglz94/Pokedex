import React from "react";

export default function Pagination({
  onLeftClick,
  onRightClick,
  page,
  totalPages,
}) {
  return (
    <div className="pagination">
      <button className="pagination-btn" onClick={onRightClick}>
        <div>{"<"}</div>
      </button>
      <div>{page} de {totalPages}</div>
      <button className="pagination-btn" onClick={onLeftClick}>
        <div>{">"}</div>
      </button>
    </div>
  );
}
