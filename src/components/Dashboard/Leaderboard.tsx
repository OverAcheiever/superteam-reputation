import {
  Center,
  Container,
  Table,
  TableContainer,
  Tbody, Text, Th, Thead, Tr, useMediaQuery
} from '@chakra-ui/react';
import * as React from 'react';
import { filters } from '../../interfaces/filters.enum';
import { xpTableType } from '../../interfaces/xpTable';
import Pagination from '../Pagination';
import TableRow from './Row/TableRow';
import TableRowMobile from './Row/TableRowMobile';
//import XPGraph from './graph';

type propsType = {
  _filter_by: filters;
  row: xpTableType[];
  searching: boolean;
};

//todo: for now the data which is received is sorted for the highest overall xp, we need to sort this as per filter_by value for each tab
function sortArrayAscending(
  array: xpTableType[],
  _filter_by: filters
): xpTableType[] {
  return array.sort(({ dev_xp: a }, { dev_xp: b }) => a - b);
}

export default function EnhancedTable({
  row,
  _filter_by,
  searching,
}: propsType) {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isSmallerThan990] = useMediaQuery('(max-width: 990px)');

  const PageSize = 15;

  const rows = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const arr = row.slice(firstPageIndex, lastPageIndex);
    return arr;
  }, [currentPage, row]);

  return (
    <>
      <Container maxW="7xl" p="0" mt={'1.6rem'} rounded="6px">
        <TableContainer>
          <Table variant="unstyled">
            {!isSmallerThan990 && (
              <Thead
                border="1px solid"
                borderColor={'superteamBlack.800'}
                borderBottomColor="superteamBlack.200"
                borderTopRadius="6px"
                bg="superteamBlack.800"
                borderRadius={'10px'}
                roundedTop="md"
              >
                <Tr>
                  <Th
                    padding="12px"
                    textTransform={'capitalize'}
                    fontWeight="500"
                    fontSize={'14px'}
                  >
                    Rank
                  </Th>
                  <Th
                    w="12rem"
                    textTransform={'capitalize'}
                    fontWeight="500"
                    fontSize={'14px'}
                  >
                    {' '}
                    Name
                  </Th>
                  <Th
                    w="8rem"
                    textTransform={'capitalize'}
                    fontWeight="500"
                    fontSize={'14px'}
                  >
                    Total
                  </Th>
                  <Th
                    w="18rem"
                    textTransform={'capitalize'}
                    fontWeight="500"
                    fontSize={'14px'}
                  >
                    Last 30d
                  </Th>
                  <Th
                    textTransform={'capitalize'}
                    fontWeight="500"
                    fontSize={'14px'}
                  >
                    Categories
                  </Th>
                  <Th w="1.2rem"></Th>
                </Tr>
              </Thead>
            )}
            <Tbody border="1px solid" borderColor={'superteamBlack.200'}>
              {rows.map((row: any, key: number) =>
                isSmallerThan990 ? (
                  <TableRowMobile
                    row={row}
                    key={key}
                    index={(currentPage - 1) * 15 + key}
                    searching={searching}
                  />
                ) : (
                  <TableRow
                    row={row}
                    key={key}
                    index={(currentPage - 1) * 15 + key}
                    searching={searching}
                  />
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {rows.length === 0 && (
          <Center
            height={'60vh'}
            w="100%"
            borderWidth="0px 1px 1px 1px"
            borderColor={'superteamBlack.200'}
            flexDir={'column'}
            gap="1rem"
            textAlign={'center'}
          >
            <Center>
              <svg
                width="117"
                height="117"
                viewBox="0 0 117 117"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity="0.18"
                  cx="58.5"
                  cy="58.5"
                  r="58.5"
                  fill="#799BBE"
                  fillOpacity="0.47"
                />
                <rect
                  x="34.3293"
                  y="41.6857"
                  width="31.8772"
                  height="34.3293"
                  rx="1.5"
                  fill="#799BBE"
                  fillOpacity="0.47"
                />
                <rect
                  opacity="0.3"
                  x="71.1106"
                  y="41.6857"
                  width="12.2605"
                  height="34.3293"
                  rx="1"
                  fill="#799BBE"
                  fillOpacity="0.47"
                />
              </svg>
            </Center>
            <Text fontWeight="500" fontSize="18px" color={'superteamWhite'}>
              404 Nothing Found
            </Text>
            <Text maxW="26rem" fontWeight="400" fontSize="17px">
              XP system helps us understand who did what when and why this is{' '}
            </Text>
          </Center>
        )}
      </Container>
      <Center alignItems={'start'} justifyContent="start" py="2rem">
        <Pagination
          onPageChange={(page: number) => {
            setCurrentPage(page);
          }}
          siblingCount={0}
          currentPage={currentPage}
          totalCount={row.length}
          pageSize={PageSize}
        />
      </Center>
    </>
  );
}
