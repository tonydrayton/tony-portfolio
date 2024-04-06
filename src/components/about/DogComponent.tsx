import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { DogApiResponse } from '@/lib/dogApi/types';
import { motion } from "framer-motion"
import { Card } from '@radix-ui/themes';

const DogComponent = () => {
    const [dog, setDog] = useState<null | string>(null);

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
        <>
            {dog && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                        delay: 1,
                        duration: 1,
                        ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="flex justify-center"
                >
                    <Card
                        size={{
                            lg: "2",
                            md: "2",
                            sm: "2",
                            initial: "2"
                        }}
                        className="lg:max-w-96 md:max-w-80 sm:max-w-72 dark:shadow-card_dark"
                    >
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
                            className='w-fit rounded-md data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10'
                        />
                    </Card>
                </motion.div>
            )}
        </>
    );
};

export default DogComponent;
