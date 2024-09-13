import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { categoryGroups } from "../../../constants/projectsCategories";
import ProjectCard from "../../../components/Custom/ProjectCard/ProjectCard";
import { getProjectByCategory } from "../../../services/ProjectCollectionApi";

const AllProjects = ({ textColor, handleProjectClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(["All"]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cache, setCache] = useState({});

  // Function to fetch projects from the getProjectByCategory API
  const fetchProjects = async (category, searchQuery, page) => {
    const cacheKey = `${category}-${searchQuery}-${page}`; // Create a cache key
    setLoading(true);

    // Check if the data is already cached
    if (cache[cacheKey]) {
      setProjects((prevProjects) => [
        ...prevProjects,
        ...cache[cacheKey], // Use cached data
      ]);
      setLoading(false);
      return;
    }

    try {
      const body = {
        categories: category.includes("All") ? [] : categoryGroups[category],
        search_value: searchQuery,
      };

      const response = await getProjectByCategory(body, page);
      if (response?.data?.length === 0 || !response?.data?.next_page_url) {
        setHasMore(false);
      }

      // Store fetched projects in the cache
      setCache((prevCache) => ({
        ...prevCache,
        [cacheKey]: response?.data?.data || [], // Cache the response data
      }));

      setProjects((prevProjects) => [
        ...prevProjects,
        ...(response?.data?.data || []),
      ]);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryLabel) => {
    setSelectedCategory([categoryLabel]); // Update the selected category array
  };

  // Fetch projects on category change or search query change
  useEffect(() => {
    setProjects([]); // Reset projects
    setPage(1); // Reset to first page
    setHasMore(true); // Reset infinite loading flag
    fetchProjects(selectedCategory, debouncedSearchQuery, 1); // Fetch new projects
  }, [selectedCategory, debouncedSearchQuery]);

  // Infinite scrolling - Fetch more projects when the user scrolls to the bottom
  useEffect(() => {
    const screenContainer = document.querySelector(".screen-container");

    const handleScroll = () => {
      if (screenContainer) {
        const scrollTop = screenContainer.scrollTop;
        const containerHeight = screenContainer.clientHeight;
        const scrollHeight = screenContainer.scrollHeight;

        // Check if the user is near the bottom of the screen-container div
        if (scrollTop + containerHeight + 50 >= scrollHeight) {
          if (!loading && hasMore) {
            setPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchProjects(selectedCategory, debouncedSearchQuery, nextPage); // Fetch with the correct page
              return nextPage; // Update page state correctly
            });
          }
        }
      }
    };

    // Add event listener to the screen-container div
    screenContainer?.addEventListener("scroll", handleScroll);

    // Cleanup scroll event listener
    return () => {
      screenContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore, selectedCategory, debouncedSearchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery); // Set the debounced query
    }, 500); // 500ms delay

    // Cleanup the timeout if search query changes before the timeout is finished
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <Box mb={6}>
      <Heading fontSize="2xl" fontWeight="bold" mb={2} color={textColor}>
        Browse All Available Projects
      </Heading>

      {/* Search Bar and Category Filter */}
      <Flex justifyContent="center" alignItems="center" mb={6} gap={4}>
        {/* Search Input */}
        <Input
          placeholder="Search projects by title..."
          value={searchQuery}
          onChange={handleSearch}
          size="md"
          maxW="400px" // Increased max width for better appearance
          borderColor="gray.300"
          boxShadow="sm"
        />

        {/* Category Dropdown */}
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg="white"
            color="gray.700"
            _hover={{
              bg: "gray.100",
            }}
            _focus={{
              boxShadow: "outline",
            }}
          >
            {selectedCategory[0]} {/* Display first category */}
          </MenuButton>
          <MenuList bg="white" boxShadow="lg">
            {Object.keys(categoryGroups).map((categoryLabel) => (
              <MenuItem
                key={categoryLabel}
                onClick={() => handleCategoryChange(categoryLabel)}
                _hover={{
                  bg: "gray.200",
                }}
              >
                {categoryLabel}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      {/* Projects Grid */}
      <Grid templateColumns="repeat(3, minmax(250px, 1fr))" gap={6}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            subtitle={project.category}
            handleProjectClick={() => handleProjectClick(project)}
          />
        ))}
      </Grid>

      {/* Loading Spinner */}
      {loading && (
        <Flex justifyContent="center" alignItems="center" mt={6}>
          <Spinner size="lg" />
        </Flex>
      )}
    </Box>
  );
};

export default AllProjects;
