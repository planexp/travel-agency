import React from 'react';
import {shallow} from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from './OrderOptionDate';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='Lorem ipsum' name='test' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

/*  it('should render correct name props', () => {
    const expectedName = 'XYZ';

    const component = shallow(<OrderOption name={expectedName} type='xxx' />);

    const renderedName = component.find('.title').text();
    expect(renderedName).toEqual(expectedName);
  }); */
});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption; /* 1 */

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });
      //console.log(component.debug());
      //console.log(subcomponent.debug());

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });
        it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
        break;
    } case 'icons': {
      it('renders div with class icons', () => {
        const divIcons = renderedSubcomponent.find('.icon .icon');
        expect(divIcons).toHaveLength(3);
      });
      it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon .icon').at(2).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
    } case 'checkboxes': {
      it('renders input with type checkbox', () => {
        const checkbox = renderedSubcomponent.find('input');
        expect(checkbox).toHaveLength(2);

        expect(checkbox.at(1).prop('value')).toBe(testValue);

        checkbox.at(1).simulate('change', {currentTarget: {checked: true}});
        expect(mockSetOrderOption).toBeCalledTimes(1);
        expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue]});
      });
        break;
    } case 'number': {
      it('renders input with type number', () => {
        const input = renderedSubcomponent.find('input');
        expect(input).toHaveLength(1);
      });
      it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
    } case 'text': {
      it('renders input with type text', () => {
        const input = renderedSubcomponent.find('.input');
        expect(input).toHaveLength(1);
      });
      it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('.input').at(0).simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
    } case 'date': {
      it('should run setOrderOption function on change', () => {
          const date = renderedSubcomponent.find('DatePicker');
          expect(date).toHaveLength(1);

          renderedSubcomponent.find('DatePicker').simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break
      }
    }
  });
}
