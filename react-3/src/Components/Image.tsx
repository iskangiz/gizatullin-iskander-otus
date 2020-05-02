import React from 'react'

interface IProps {
    src: string
}

export const Image = ({  src }: IProps) =>
    <img src={src} />
