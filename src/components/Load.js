import React from 'react';

import { ActivityIndicator } from 'react-native';

function Load() {
    return (
        <div>
            <ActivityIndicator
                color="blue"
                size="large"
                style={{
                    position: 'absolute',
                    alignItems: 'center',
                    justifyContent: 'center',
                    left: 0,
                    right: 0,
                    top: 0, 
                    bottom: 0,
                  }} 
                >
            </ActivityIndicator>
        </div>
    )
}

export default Load;