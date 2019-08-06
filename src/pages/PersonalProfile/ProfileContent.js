import React from 'react';
import XButton from '../../components/UI/XButton/XButton';
import Button from '../../components/UI/Button/Button';
import styled from 'styled-components';
import './PersonalProfile.styles.css';

const ProfileContentWrapper = styled.div`
	flex-direction: column;
	padding: 0 5rem 0 1rem;
	@media (max-width: 720px) {
		padding-left: 5rem;
	}
`;

class ProfileContent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			aboutMeVal: '',
			interestsVal: '',
			aboutMe: localStorage.aboutMe || '',
			interests: localStorage.interests || '',
			edit: false
		};
	}

	handleChange = (field) => {
		return (e) => {
			this.setState({
				[field]: e.target.value
			});
		};
	};

	editInfo = () => {
		this.setState({ edit: true });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({ edit: false }, () => {
			localStorage.aboutMe = this.state.aboutMeVal;
		});
	};

	render() {
		let myInfo;
		if (this.state.aboutMe && this.state.edit === false) {
			myInfo = (
				<div>
					<p className='my-info'>{this.state.aboutMe}</p>
					<Button onClick={this.editInfo} btnType='ProfileCard'>
						Edit
					</Button>
				</div>
			);
		} else if (this.state.edit === true) {
			myInfo = (
				<form onSubmit={this.handleSubmit}>
					<textarea
						defaultValue={this.state.aboutMe}
						onChange={this.handleChange('aboutMeVal')}
						className='about-me'
					/>
					<Button type='submit' btnType='ProfileCard'>
						Submit
					</Button>
				</form>
			);
		} else {
			myInfo = (
				<form onSubmit={this.handleSubmit}>
					<textarea onChange={this.handleChange('aboutMeVal')} className='about-me' />
					<Button type='submit' btnType='ProfileCard'>
						Submit
					</Button>
				</form>
			);
		}

		return (
			<ProfileContentWrapper>
				<div>
					<h2 className='text-large color-purple profile-content-title'>About me</h2>
					{myInfo}
					{/* <form onSubmit={this.handleSubmit}>
						<textarea
							defaultValue={this.state.aboutMeVal}
							onChange={this.handleChange('aboutMeVal')}
							className='about-me'
						/>
						<Button type='submit' btnType='ProfileCard'>
							Submit
						</Button>
					</form> */}
				</div>
				<div>
					<h2 className='text-large color-purple profile-content-title'>Interests</h2>
					{this.props.interests.map((interest, id) => (
						<XButton key={id} btnType='InterestsTag'>
							{interest}
						</XButton>
					))}
				</div>
			</ProfileContentWrapper>
		);
	}
}

export default ProfileContent;
