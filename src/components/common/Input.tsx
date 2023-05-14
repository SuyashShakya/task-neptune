import React from 'react';
import {
  Box,
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputProps as ChakraInputProps,

  Text,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  helperText?: string;
  errorText?: string;
  label?: string;
  placeholder?: string;
  __placeholder?: string;
  rightAddonText?: string;
  leftAddonText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type,
    name,
    rightElement,
    leftElement,
    helperText,
    placeholder,
    errorText,
    label,
    size = 'default',
    rightAddonText,
    leftAddonText,
    isRequired,
    ...rest
  } = props;

  return (
    <Box w="auto" display="flex" flexDirection="column" flexGrow={1} gap="s4">
      {label && (
        <Text variant="formLabel" color="gray.700">
          {isRequired ? `${label} *` : label}
        </Text>
      )}

      <InputGroup borderRadius="br2" height={size === 'default' ? 's44' : '36px'}>
        {leftAddonText && (
          <InputLeftAddon
            children={leftAddonText}
            bg="white"
            color="accent.debit"
            border="1px solid"
            borderColor={errorText ? 'red.500' : 'gray.300'}
          />
        )}
        <ChakraInput
          type={type}
          name={name}
          ref={ref}
          autoComplete="none"
          borderRight={rightAddonText && 'none'}
          bg='white'
          {...rest}
        />
      </InputGroup>

    </Box>
  );
});

export default Input;

