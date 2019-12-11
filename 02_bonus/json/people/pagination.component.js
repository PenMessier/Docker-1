class PaginationComponent {
	constructor(model) {
		this.personModel = model;
		$('[data-pages-count]')
			.on('change', () => this.render(this.personModel.length));
	}

	render(length) {
		$('li.page-item').remove();
		const $template = $($('[data-template="pagination"]').text());
		$('ul.pagination').append($template);

		let itemsOnPage = parseInt($('[data-pages-count]').val());
		let pagesCount = Math.ceil(length/itemsOnPage);

		for(let i = 1; i <= pagesCount; i++) {
			let $itemTemplate = $($('[data-template="paginationItem"]').text());
			$itemTemplate.find('button').text(i);
			$itemTemplate
				.attr('data-page-id', i)
				.insertBefore($('[data-next-page]'));
		}

		this.pageFilter(1, itemsOnPage, pagesCount);
		this.switchPage(pagesCount);
	}

	pageFilter(id, itemsOnPage, pagesCount) {
		let $currentPage = $('[data-page-id="' + id + '"]');
		let end = id * itemsOnPage;
		let start = end - itemsOnPage;

		$('[data-page-item].active')
			.removeClass('active')
			.children()
			.removeClass('bg-danger border-danger')
			.addClass('text-danger');

		$currentPage
			.addClass('active')
			.children().addClass('bg-danger border-danger').removeClass('text-danger');

		if(id == 1)
			$('[data-prev-page]')
				.addClass('disabled')
				.removeAttr('data-id')
				.children().removeClass('text-danger');
		else
			$('[data-prev-page]')
				.attr('data-id', (id - 1))
				.removeClass('disabled')
				.children().addClass('text-danger');
		
		if($('[data-next-page]').prev().attr('data-page-id') != id)
			$('[data-next-page]')
				.attr('data-id', (+(id) + 1))
				.removeClass('disabled')
				.children().addClass('text-danger');
		else
			$('[data-next-page]')
				.addClass('disabled')
				.removeAttr('data-id')
				.children().removeClass('text-danger');
		
		this.personModel.setPersonsOnPage(start, end);
		this.pagSort(pagesCount);
	}

	pagSort(pagesCount) {
		if(pagesCount > 5) {
			let $currentPage = $('[data-page-item].active');
			let currentId = parseInt($currentPage.attr('data-page-id'));

			let $itemDots = $($('[data-template="paginationItem"]').text());
			$itemDots
				.addClass('li_dots disabled')
				.find('button').text('...');

			$('.li_dots').remove();
			$('[data-page-item]').hide();
		
			$('[data-prev-page]').next().show();
			$('[data-next-page]').prev().show();

			let i;
			if(currentId == 1 || currentId == 2) {
				for(i = currentId; i < currentId + 3; i++)
					$('[data-page-id="' + i + '"]').show();
				$itemDots.insertBefore($('[data-page-id="' + pagesCount + '"]'));
			}

			if(currentId == pagesCount || currentId == pagesCount - 1) {
				for(i = currentId; i > currentId - 3; i--)
					$('[data-page-id="' + i + '"]').show();
					$itemDots.insertAfter($('[data-page-id="1"]'));
			}

			if(currentId > 2 && currentId < pagesCount - 1) {
				for(i = currentId - 1; i < currentId + 2; i++)
					$('[data-page-id="' + i + '"]').show();
				if(currentId != 3)
					$itemDots.insertAfter($('[data-page-id="1"]'));
				if(currentId != pagesCount - 2)
					$itemDots.clone().insertBefore($('[data-page-id="' + pagesCount + '"]'));
			}
		}
	}

	switchPage(pagesCount) {
		$('[data-page-item], [data-prev-page], [data-next-page]').on('click', (e) =>
		{
			let id = $(e.target).parent().attr('data-page-id') ? 
				$(e.target).parent().attr('data-page-id') : +($(e.target).parent().attr('data-id'));
			let itemsOnPage = +($('[data-pages-count]').val());
			this.pageFilter(id, itemsOnPage, pagesCount);
		})
	}
}