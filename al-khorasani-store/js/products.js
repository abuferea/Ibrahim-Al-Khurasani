// Products page functionality

document.addEventListener('DOMContentLoaded', function() {
    initProductFilters();
    initProductSearch();
    initProductModal();
    addPageHeaderStyles();
});

// Initialize product filters
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize product search
function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    const searchBtn = document.querySelector('.search-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('p').textContent.toLowerCase();
            
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reset filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
    }
    
    searchInput.addEventListener('input', performSearch);
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Initialize product modal
function initProductModal() {
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // Product details data
    const productDetails = {
        coffee1: {
            name: 'قهوة خولانية فاخرة',
            price: '2500 ريال للكيلو',
            image: '../images/products/yemeni_coffee.png',
            description: 'قهوة خولانية فاخرة من أجود أنواع القهوة في العالم. تزرع في المرتفعات الجبلية في منطقة خولان، وتتميز بطعمها الغني ونكهتها المميزة.',
            features: [
                'محمصة بالطريقة التقليدية',
                'خالية من المواد الحافظة',
                'معبأة في أكياس محكمة الإغلاق',
                'صالحة لمدة سنة من تاريخ التحميص'
            ],
            origin: 'منطقة خولان، اليمن',
            weight: '1 كيلو',
            rating: 5
        },
        coffee2: {
            name: 'قهوة مطحونة طازجة',
            price: '2200 ريال للكيلو',
            image: '../images/products/yemeni_coffee.png',
            description: 'قهوة مطحونة حديثاً وجاهزة للتحضير المباشر. مطحونة بدرجة مناسبة لجميع طرق التحضير.',
            features: [
                'مطحونة حديثاً',
                'درجة طحن متوسطة',
                'مناسبة لجميع طرق التحضير',
                'معبأة في عبوات محكمة'
            ],
            origin: 'مناطق مختلفة، اليمن',
            weight: '1 كيلو',
            rating: 5
        },
        honey1: {
            name: 'عسل سدر دوعني أصلي',
            price: '8000 ريال للكيلو',
            image: '../images/products/yemeni_honey.png',
            description: 'عسل سدر دوعني الأصلي من أفضل أنواع العسل في العالم. يتميز بلونه الذهبي الداكن وطعمه الغني وفوائده الصحية العديدة.',
            features: [
                'طبيعي 100% بدون إضافات',
                'من أشجار السدر الدوعني',
                'غني بالفيتامينات والمعادن',
                'له خصائص علاجية مميزة'
            ],
            origin: 'وادي دوعن، حضرموت',
            weight: '1 كيلو',
            rating: 5
        },
        honey2: {
            name: 'عسل سمر جبلي',
            price: '6500 ريال للكيلو',
            image: '../images/products/yemeni_honey.png',
            description: 'عسل طبيعي من أشجار السمر في المرتفعات الجبلية اليمنية. يتميز بلونه الفاتح وطعمه المعتدل.',
            features: [
                'من أشجار السمر الجبلية',
                'طعم معتدل ولذيذ',
                'غني بمضادات الأكسدة',
                'مناسب لجميع الأعمار'
            ],
            origin: 'المرتفعات الجبلية، اليمن',
            weight: '1 كيلو',
            rating: 5
        },
        jewelry1: {
            name: 'خاتم فضة بالعقيق الأصلي',
            price: '15000 ريال للقطعة',
            image: '../images/products/silver_ring.jpg',
            description: 'خاتم فضة يمني تراثي مصنوع يدوياً ومرصع بحجر العقيق اليمني الأصلي. قطعة فنية تجمع بين الأصالة والجمال.',
            features: [
                'فضة عيار 925',
                'حجر عقيق يمني أصلي',
                'صناعة يدوية تراثية',
                'تصميم يمني أصيل'
            ],
            origin: 'صنعاء، اليمن',
            weight: 'حسب المقاس',
            rating: 5
        },
        jewelry2: {
            name: 'قلادة فضية تراثية',
            price: '25000 ريال للقطعة',
            image: '../images/products/silver_jewelry.jpg',
            description: 'قلادة فضة يمنية مزخرفة بالطريقة التقليدية. تحفة فنية تعكس جمال التراث اليمني الأصيل.',
            features: [
                'فضة عيار 925',
                'زخارف تراثية يمنية',
                'صناعة حرفية متقنة',
                'قطعة فريدة ومميزة'
            ],
            origin: 'صنعاء، اليمن',
            weight: 'متغير حسب التصميم',
            rating: 5
        },
        clothing1: {
            name: 'ثوب يمني تراثي',
            price: '12000 ريال للقطعة',
            image: '../images/products/traditional_clothing.jpg',
            description: 'ثوب يمني رجالي تراثي مصنوع من أجود أنواع الأقمشة ومطرز بالطريقة اليدوية التقليدية.',
            features: [
                'قماش عالي الجودة',
                'تطريز يدوي تراثي',
                'قصة تقليدية أصيلة',
                'مناسب للمناسبات الخاصة'
            ],
            origin: 'صنعاء، اليمن',
            weight: 'مقاسات مختلفة',
            rating: 5
        },
        clothing2: {
            name: 'جبة تراثية مطرزة',
            price: '18000 ريال للقطعة',
            image: '../images/products/traditional_clothing.jpg',
            description: 'جبة يمنية فاخرة بتطريز يدوي مميز وألوان تراثية أصيلة. قطعة أنيقة تناسب المناسبات الرسمية.',
            features: [
                'تطريز يدوي فاخر',
                'ألوان تراثية أصيلة',
                'قماش فاخر عالي الجودة',
                'تصميم كلاسيكي أنيق'
            ],
            origin: 'صنعاء، اليمن',
            weight: 'مقاسات مختلفة',
            rating: 5
        }
    };
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productKey = this.getAttribute('data-product');
            const product = productDetails[productKey];
            
            if (product) {
                showProductModal(product);
            }
        });
    });
    
    function showProductModal(product) {
        modalBody.innerHTML = `
            <div class="modal-product">
                <div class="modal-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-product-info">
                    <h2>${product.name}</h2>
                    <div class="modal-price">${product.price}</div>
                    <div class="modal-rating">
                        <span class="stars">${'⭐'.repeat(product.rating)}</span>
                    </div>
                    <p class="modal-description">${product.description}</p>
                    
                    <div class="product-features">
                        <h4>المميزات:</h4>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-specs">
                        <div class="spec-item">
                            <strong>المنشأ:</strong> ${product.origin}
                        </div>
                        <div class="spec-item">
                            <strong>الوزن/المقاس:</strong> ${product.weight}
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary add-to-cart" data-product-id="1">أضف إلى السلة</button>
                        <button class="btn btn-outline">اتصل للاستفسار</button>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Re-initialize cart functionality for modal button
        const modalCartBtn = modalBody.querySelector('.add-to-cart');
        if (modalCartBtn) {
            modalCartBtn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-product-id'));
                addToCart(productId);
                closeModalFunction();
            });
        }
    }
    
    function closeModalFunction() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', closeModalFunction);
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
}

// Add page header styles
function addPageHeaderStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .page-header {
            background: linear-gradient(rgba(45, 80, 22, 0.8), rgba(45, 80, 22, 0.6)), 
                        url('../images/backgrounds/sanaa_architecture.jpg');
            background-size: cover;
            background-position: center;
            color: white;
            text-align: center;
            padding: 120px 0 80px;
            margin-top: 80px;
        }
        
        .page-header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .page-header p {
            font-size: 1.2rem;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        
        .products-filter {
            background: #F8F9FA;
            padding: 2rem 0;
        }
        
        .filter-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }
        
        .filter-btn {
            background: white;
            border: 2px solid #2D5016;
            color: #2D5016;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Tajawal', sans-serif;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: #2D5016;
            color: white;
        }
        
        .search-box {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            max-width: 400px;
            margin: 0 auto;
        }
        
        .search-box input {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 25px;
            font-family: 'Tajawal', sans-serif;
            text-align: right;
        }
        
        .search-box input:focus {
            outline: none;
            border-color: #2D5016;
        }
        
        .search-btn {
            background: #2D5016;
            color: white;
            border: none;
            padding: 0.75rem 1rem;
            border-radius: 25px;
            cursor: pointer;
        }
        
        .products-section {
            padding: 3rem 0;
        }
        
        .product-rating {
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .rating-text {
            color: #666;
            font-size: 0.9rem;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 0;
            border-radius: 15px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            left: 20px;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            z-index: 1;
            color: #666;
        }
        
        .close-modal:hover {
            color: #2D5016;
        }
        
        .modal-product {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }
        
        .modal-product-image img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 10px;
        }
        
        .modal-product-info h2 {
            color: #2D5016;
            margin-bottom: 1rem;
        }
        
        .modal-price {
            font-size: 1.5rem;
            color: #D4AF37;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .modal-description {
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }
        
        .product-features h4 {
            color: #2D5016;
            margin-bottom: 0.5rem;
        }
        
        .product-features ul {
            list-style: none;
            padding-right: 1rem;
        }
        
        .product-features li {
            margin-bottom: 0.5rem;
            position: relative;
        }
        
        .product-features li::before {
            content: '✓';
            color: #2D5016;
            font-weight: bold;
            position: absolute;
            right: -1rem;
        }
        
        .product-specs {
            margin: 1.5rem 0;
            padding: 1rem;
            background: #F8F9FA;
            border-radius: 8px;
        }
        
        .spec-item {
            margin-bottom: 0.5rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        
        @media (max-width: 768px) {
            .page-header h1 {
                font-size: 2rem;
            }
            
            .filter-controls {
                gap: 0.5rem;
            }
            
            .filter-btn {
                padding: 0.4rem 0.8rem;
                font-size: 0.9rem;
            }
            
            .modal-product {
                grid-template-columns: 1fr;
                gap: 1rem;
                padding: 1rem;
            }
            
            .modal-product-image img {
                height: 250px;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);
}

