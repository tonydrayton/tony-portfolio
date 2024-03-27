import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DogApiResponse } from '@/lib/dogApi/types';

const DogComponent = () => {
    const [dog, setDog] = useState('');

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const dog = await getDog();
                setDog(dog);
            } catch (error) {
                console.error('Error fetching dog:', error);
            }
        };

        fetchDog();
        return () => {

        };
    }, []);

    async function getDog() {
        const res = await fetch(
            `https://dog.ceo/api/breed/retriever/golden/images/random`,
            { cache: 'no-store' }
        );
        const json = await res.json() as DogApiResponse;
        return json.message;
    }

    return (
        <Image
            src={dog}
            alt='Dog'
            width={0}
            height={0}
            sizes='100vw'
            data-loaded='false'
            onLoad={event => {
                event.currentTarget.setAttribute('data-loaded', 'true')
            }}
            className='w-fit data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10'
        />
    );
};

export default DogComponent;
