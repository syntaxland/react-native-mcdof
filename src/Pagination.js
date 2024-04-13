// Pagination.js
import React from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";

function Pagination({ itemsPerPage, totalItems, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxVisiblePages = 5;

  let startPage = 1;
  let endPage = pageNumbers.length;

  if (pageNumbers.length > maxVisiblePages) {
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      endPage = maxVisiblePages - 1;
    } else if (
      currentPage >
      pageNumbers.length - Math.ceil(maxVisiblePages / 2)
    ) {
      startPage = pageNumbers.length - maxVisiblePages + 2;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = currentPage + Math.floor(maxVisiblePages / 2);
    }
  }

  const pagesToShow = pageNumbers.slice(startPage - 1, endPage);

  return (
    <View style={{ paddingVertical: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          disabled={currentPage === 1}
          onPress={() => paginate(currentPage - 1)}
        >
          <Text style={{ color: currentPage === 1 ? "gray" : "blue" }}>
            <Button
              title="Previous"
              onPress={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              color={currentPage === 1 ? "gray" : "#007bff"}
            />
          </Text>
        </TouchableOpacity>
        {startPage > 1 && (
          <>
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={() => paginate(1)}
            >
              <Text>1</Text>
            </TouchableOpacity>
            {startPage > 2 && <Text style={{ marginHorizontal: 5 }}>...</Text>}
          </>
        )}
        {pagesToShow.map((number) => (
          <TouchableOpacity
            key={number}
            style={{ marginHorizontal: 5 }}
            onPress={() => paginate(number)}
          >
            <Text style={{ color: currentPage === number ? "red" : "blue" }}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
        {endPage < pageNumbers.length && (
          <>
            {endPage < pageNumbers.length - 1 && (
              <Text style={{ marginHorizontal: 5 }}>...</Text>
            )}
            <TouchableOpacity
              style={{ marginHorizontal: 5 }}
              onPress={() => paginate(pageNumbers.length)}
            >
              <Text>{pageNumbers.length}</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          disabled={currentPage === pageNumbers.length}
          onPress={() => paginate(currentPage + 1)}
        >
          <Text
            style={{
              color: currentPage === pageNumbers.length ? "gray" : "blue",
            }}
          >
            <Button
              title="Next"
              onPress={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
              color={currentPage === pageNumbers.length ? "gray" : "#007bff"}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Pagination;
