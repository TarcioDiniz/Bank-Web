const StringAvatar = (name: string | undefined): { children: string } => {
    if (!name) {
        return {
            children: 'NA', // Use any default text or icon for undefined names
        };
    }

    const initials = name
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase())
        .join('');

    return {
        children: initials, // Use first letters of first and last names
    };
};

export default StringAvatar;