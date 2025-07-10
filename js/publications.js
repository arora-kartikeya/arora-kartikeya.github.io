// Publications page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    const searchInput = document.getElementById('search-input');

    // Filter by type
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter publications
            filterPublications(filter, searchInput.value);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            filterPublications(activeFilter, this.value);
        });
    }

    function filterPublications(typeFilter, searchTerm) {
        publicationItems.forEach(item => {
            const type = item.getAttribute('data-type');
            const title = item.querySelector('h3').textContent.toLowerCase();
            const authors = item.querySelector('.publication-authors').textContent.toLowerCase();
            const venue = item.querySelector('.publication-venue').textContent.toLowerCase();
            const abstract = item.querySelector('.publication-abstract').textContent.toLowerCase();
            
            const matchesType = typeFilter === 'all' || type === typeFilter;
            const matchesSearch = searchTerm === '' || 
                                title.includes(searchTerm.toLowerCase()) ||
                                authors.includes(searchTerm.toLowerCase()) ||
                                venue.includes(searchTerm.toLowerCase()) ||
                                abstract.includes(searchTerm.toLowerCase());
            
            if (matchesType && matchesSearch) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Hide/show year sections if all publications in a year are hidden
        document.querySelectorAll('.year-section').forEach(yearSection => {
            const visibleItems = yearSection.querySelectorAll('.publication-item:not(.hidden)');
            if (visibleItems.length === 0) {
                yearSection.style.display = 'none';
            } else {
                yearSection.style.display = 'block';
            }
        });
    }

    // Add scroll animations for publication items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe publication items
    publicationItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
