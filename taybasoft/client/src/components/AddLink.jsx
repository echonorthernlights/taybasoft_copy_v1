import { MdAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled.div`
    .add-link:hover {
        opacity: .8;
    }
    .add-link {
        color: var(--text-color);
        display: flex;
        alignItems: center;
        gap: .3rem;
        font-weight: 500;
    },
    .add-link:visited {
        color: inherit;
    }
    .add-icon {
        color: var(--icon-green-color);
        font-size: larger;
    }
    `
const AddLink = ({ text, path }) => (
    <StyledLink>
        <Link className="add-link" to={path}>
            <MdAddBox className="add-icon" />
            {text}
        </Link>
    </StyledLink>
)

export default AddLink