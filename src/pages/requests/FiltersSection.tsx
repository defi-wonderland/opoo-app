import styled from 'styled-components';

import { Icon } from '~/components';
import { Filter } from '~/types';

const FilterSection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  margin: 2rem 0;
`;

const FilterButton = styled.button`
  border: none;
  background-color: #ffffff;
  border-radius: 0.4rem;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;

  min-width: max-content;

  color: #0d0e12;
  font-family: Rubik;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0.45rem 0.8rem;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
    transition: all 0.2s ease-in-out;
  }
`;

const MainFilterButton = styled(FilterButton)`
  background-color: transparent;
  border: 1px dashed #0d0e12;
`;

interface FiltersProps {
  filters: Filter[];
}
export const FiltersSection = ({ filters }: FiltersProps) => {
  return (
    <div>
      <FilterSection>
        <MainFilterButton>
          <Icon name='plus' size='1.5rem' />
          <span>Filter</span>
        </MainFilterButton>

        {filters.map((filter, index) => (
          <FilterButton key={'filter-item-' + index}>
            {filter.icon && <Icon name={filter.icon} size='1.5rem' />}
            {filter.text && <span>{filter.text}</span>}
          </FilterButton>
        ))}
      </FilterSection>
    </div>
  );
};
