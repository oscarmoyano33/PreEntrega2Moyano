import React from 'react';

const Radio = ({ option, options, optionSelected }) => {
    return (
        <div>
            {
                options.map((op) => (
                    <div key={op.value}>
                        <input
                            type='radio'
                            id={`option_${op.value}`}
                            name='options'
                            value={op.value}
                            checked={option === op.value}
                            onChange={() => optionSelected(op.value)}
                        />
                        <p>{op.text}</p>
                    </div>
                ))
            }

        </div>
    );
};

export default Radio;