import React from "react";
import "./styles.css";
import { EmptyState, Loader, ScreenContainer } from "../../components";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getProjectSessions } from "../../services/ProjectSessionApi";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { SESSION_DETAIL_ROUTE } from "../../constants/routes";

const SessionsHistory = () => {
  const navigate = useNavigate();
  const { data: projectSessions, loading: projectSessionsLoading } = useFetch(
    () => getProjectSessions()
  );

  const handleRowClick = (sessionId) => {
    navigate(`/${SESSION_DETAIL_ROUTE.replace(":sessionId", sessionId)}`);
  };

  // Extract colors using useColorModeValue
  const rowHoverBg = useColorModeValue("gray.50", "gray.600");
  const rowBg = useColorModeValue("white", "gray.700");
  const titleTextColor = useColorModeValue("gray.900", "gray.100");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Sort project sessions by created_at (newest first)
  const sortedSessions = projectSessions
    ?.slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <ScreenContainer>
      {projectSessionsLoading ? (
        <Loader />
      ) : projectSessions?.length === 0 ? (
        <EmptyState
          title="No sessions history found"
          message="You haven't started any project sessions yet."
        />
      ) : (
        <TableContainer
          borderRadius="md"
          borderWidth="1px"
          borderColor={borderColor}
          overflowX="auto"
        >
          <Table variant="simple" colorScheme="gray" size="md">
            <Thead bg="#BEE3F8">
              <Tr>
                <Th
                  color={subTextColor}
                  fontSize="sm"
                  fontWeight="normal"
                  pb={3}
                >
                  Session Title
                </Th>
                <Th
                  color={subTextColor}
                  fontSize="sm"
                  fontWeight="normal"
                  pb={3}
                >
                  Projects
                </Th>
                <Th
                  color={subTextColor}
                  fontSize="sm"
                  fontWeight="normal"
                  pb={3}
                >
                  Created On
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedSessions?.map((session) => (
                <Tr
                  key={session.id}
                  bg={rowBg}
                  cursor="pointer"
                  _hover={{ bg: rowHoverBg }}
                  onClick={() => handleRowClick(session.id)}
                >
                  <Td>
                    <Text
                      fontWeight="medium"
                      color={titleTextColor}
                      fontSize="md"
                    >
                      {session.title}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      fontWeight="normal"
                      color={subTextColor}
                      fontSize="sm"
                    >
                      {session.projects_count}
                    </Text>
                  </Td>
                  <Td>
                    <Text
                      fontWeight="normal"
                      color={subTextColor}
                      fontSize="sm"
                    >
                      {new Date(session.created_at).toLocaleDateString()}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </ScreenContainer>
  );
};

export default SessionsHistory;
