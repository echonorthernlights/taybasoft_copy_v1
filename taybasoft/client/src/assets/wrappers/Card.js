import styled from "styled-components"

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	border: 1px solid #ddd;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	width: 280px;
	height: 300px;
	transition: transform 0.3s ease-in-out;
	// margin: 1rem;

	img {
		width: 100%;
		height: 40%;
		// object-fit: cover;
		display: block;
		margin: auto;
		opacity: 0.6;
		border-bottom: 1px solid var(--grey-300);
	}

	.card-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;

		h5 {
			margin-bottom: 0.5rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		p {
			display: grid;
			grid-template-columns: auto 1fr;
			column-gap: 0.5rem;
			margin-top: 1rem;
			span {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
		background-color: var(--grey-100);
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	&:hover {
		transform: scale(1.05);
	}
`

export default Wrapper
