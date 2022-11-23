import React from 'react';

import IMAGE_CITATIONS from '../data/imageCitations.json';

export function Footer(props) {
    const citingLinks = IMAGE_CITATIONS.map((imageToCite) => {
        if(imageToCite.id == props.currentPage) {
            return (
                <cite key={imageToCite.citationDescription}>
                    <a href={imageToCite.citationLink}>{imageToCite.citationDescription}</a>-
                </cite>
            )};
    });

    return (
        <footer>
            <div className="citing-links">
                <p>
                    {citingLinks}
                </p>
            </div>
            <ul className="contact-info">
                <li><a href="mailto:esmokoff@uw.edu"><span className="material-icons">email</span>esmokoff@uw.edu</a></li>
                <li>&copy; Eco-Life 2022</li>
            </ul>
        </footer>
    );
}