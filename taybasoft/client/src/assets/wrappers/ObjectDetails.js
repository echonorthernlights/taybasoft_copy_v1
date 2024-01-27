import styled from "styled-components"

const Wrapper = styled.div`
	width: 100%;
	border-radius: var(--border-radius);
	background: var(--background-secondary-color);
	padding: 2rem 2rem 0rem;
	.details-content {
		& > * {
			margin-bottom: 1rem;
		}
	}
	p {
		display: flex;
		align-items: center;
		column-gap: 0.2rem;
		span {
			font-weight: 500;
		}
	}

	.operations {
		& > * {
			margin-right: 0.5rem;
		}
	}

	.details-title {
		margin: 1rem 0 2.5rem 0;
	}
	.details-sub-title {
		margin-top: 2rem;
	}
`

export default Wrapper
