import { Button } from '@chakra-ui/react';

const HistoryItem = ({ city, onClick }) => {
  return (
    <Button colorScheme='blue' onClick={onClick}>
      {city}
    </Button>
  );
};

export default HistoryItem;
