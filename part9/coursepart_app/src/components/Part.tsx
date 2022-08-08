import React from 'react';
import { PartProps } from '../types'

const Part: React.FC<PartProps> = ({part}) => {
    switch (part.type) {
        case "normal":
          return (
            <p>
                {part.name} {part.description} {part.exerciseCount}
            </p>
          )
        case "groupProject":
            return (
                <p>
                    {part.name} {part.exerciseCount} {part.groupProjectCount}
                </p>
              )
        case "submission":
        return (
            <p>
                {part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}
            </p>
            )
        default:
          return null;
      }
}

export default Part;
