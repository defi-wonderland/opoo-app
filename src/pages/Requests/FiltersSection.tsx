import styled from 'styled-components';

import { Icon } from '~/components';
import { Filter } from '~/types';
import { fontSize } from '~/utils';

const FilterSection = styled.section`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  margin: 2rem 0;
`;

const FilterButton = styled.button`
  border: none;
  background-color: ${({ theme }) => theme.filterBackground};
  border-radius: ${({ theme }) => theme.secondaryBorderRadius};
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;

  min-width: max-content;

  color: ${({ theme }) => theme.textPrimary};
  font-family: ${({ theme }) => theme.titleFontFamily};
  font-size: ${fontSize.MEDIUM};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0.45rem 0.8rem;

  &:hover {
    opacity: 0.87;
    transition: all 0.2s ease-in-out;
  }
`;

const MainFilterButton = styled(FilterButton)`
  background-color: transparent;
  border: 1px dashed ${({ theme }) => theme.textPrimary};
`;

interface FiltersProps {
  filters: Filter[];
}
export const FiltersSection = ({ filters }: FiltersProps) => {
  return (
    <div>
      <FilterSection>
        <MainFilterButton>
          {/* <Icon name='plus' size='1.5rem' /> */}
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
