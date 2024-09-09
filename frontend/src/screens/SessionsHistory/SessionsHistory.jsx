import React, { useEffect, useState } from "react";
import "./styles.css";
import { EmptyState, Loader, ScreenContainer } from "../../components";
import {
  SimpleGrid,
  Box,
  Text,
  Stack,
  Card,
  CardHeader,
  CardBody,
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

  const handleCardClick = (sessionId) => {
    navigate(`/${SESSION_DETAIL_ROUTE.replace(":sessionId", sessionId)}`);
  };
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
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {projectSessions?.map((session) => (
            <Card
              key={session.id}
              bg="#F3F4F6"
              borderRadius="md"
              shadow="md"
              cursor="pointer"
              _hover={{ shadow: "lg" }}
              onClick={() => handleCardClick(session.id)}
            >
              <CardHeader pb={2}>
                <Text fontSize="lg" fontWeight="bold" color="#191919">
                  {session.title}
                </Text>
              </CardHeader>
              <CardBody pt={2}>
                <Stack spacing={3}>
                  <Text fontSize="md" fontWeight="medium" color="#333">
                    Projects: {session.projects_count}
                  </Text>
                  <Box p={2} bg="#E2E8F0" borderRadius="md">
                    <Text fontSize="sm" fontWeight="bold" color="#555">
                      Created on:{" "}
                      <Text as="span" fontWeight="normal">
                        {new Date(session.created_at).toLocaleDateString()}
                      </Text>
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </ScreenContainer>
  );
};

export default SessionsHistory;
