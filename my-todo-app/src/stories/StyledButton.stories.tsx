import type { Meta, StoryObj } from '@storybook/react-vite';
import { StyledButton, StyledButtonProps } from '../components/StyledButton/index';

const meta: Meta<typeof StyledButton> = {
    title: 'StyledButton',
    component: StyledButton,
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<StyledButtonProps>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Success',
    },
};

export const Transparent: Story = {
    args: {
        variant: 'transparent',
        children: 'Transparent',
    },
};