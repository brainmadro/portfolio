const popupForm = `<form action='/save-place' id="popup-form" method="post" enctype="application/x-www-form-urlencoded">
  <input type='radio' name='type' id='intention-radio_input' value='intention' checked>
  <label for='intention-radio_input'>Apartar</label>
  <input type='radio' name='type' id='reservation-radio_input' value='reservation' disabled>
  <label for='intention-radio_input' class="disabled">Reservar</label>
  <span class="output-form"></span>
	<input class="hidden" type='text' name='starts_at' id='starts_at' value='ahora' readonly>
	<label for='leave_at'>Hasta:</label>
	<input type="date" name="leave-date" id="leave_date">
  <input list='leave_at' name='leave_at' id='hours_list'>
  <datalist id='leave_at'></datalist>
  <input type='submit' class='btn-primary'>
</form>`;

export default class Calendar {
  constructor(){
    this.initDate = new Date();
    this.time = new Date();
    this.getViewModel();
    this.fillCalendar(this.time.getDate());
    this.listenArrowLinks();
    if (window.innerWidth <= 800) {
      this.fillDay();
    } else {
      this.fillDays();
    }
  }

  getViewModel(){
    return {
			$arriveDate: $('#arrive_date'),
			$leaveDate: $('#leave_date'),
      $arriveTime: $('#arrive_time'),
			$leaveTime: $('#leave_time'),
			$registerStay: $('#register_stay'),
			$calendar: $('.calendar-container'),
			calendar: {
				$calendarHeader: $('.calendar-header'),
				$calendarHeaderDays: $('.calendar-header').find('.day_date'),
				$hourLists: $('.calendar-container').find('[data-hours]'),
				$hoursBar: $('.calendar-container').find('.hours')
			},
			$smallCalendar: $('.small-calendar'),
			small_calendar: {
				$dates: $('.small-calendar').find('.number_days'),
				$lastMonth:$('.small-calendar').find('[data-before]'),
				$nextMonth:$('.small-calendar').find('[data-next]'),
				$title: $('.small-calendar').find('.calendar_title_date')
			},
			$intentionBlocks: $('.intention-block'),
			$reservationBlocks: $('.reservation-block')
    }
  }
  
  getMonthDays() {
      const date = new Date(this.time.getFullYear(), this.time.getMonth(), 1);
      var days = [];
      var next = 1;
      
      if (date.getDay() != 0) {
          date.setDate(date.getDate()-date.getDay());
          next++;
      }
      
      var lastDay = new Date(date.getFullYear(), date.getMonth() + next, 0);
      days.push(date.getDate());
  
      while (date < lastDay) {
          date.setDate(date.getDate()+1);
          days.push(date.getDate());
          //console.log(date.toDateString());
      }
      return days;
  }   

  fillCalendar() {
      const viewModel = this.getViewModel();
      const $dates = viewModel.small_calendar.$dates;
      
      this.getMonthDays().forEach(element => {
          const node = document.createElement("span");
          const textnode = document.createTextNode(element);
          node.classList.add('number_day')
          if (this.time.getDate() == element) {
              node.classList.add('today_mark')
          }
          node.appendChild(textnode);
          node.addEventListener('click', (event) => {
              $('.today_mark').removeClass('today_mark')
              event.target.classList.add('today_mark')
              this.time.setDate(event.target.innerHTML);
              if (window.innerWidth <= 800) {
                this.fillDay();
              } else {
                this.fillDays();
              }
          })
          $dates.get(0).appendChild(node);
      });
      this.setMarks();
  }

  fillDay() {
      const viewModel = this.getViewModel();
      const $hourLists = viewModel.calendar.$hourLists;
      const $hoursBar = viewModel.calendar.$hoursBar;
      const $calendarHeaderDays = viewModel.calendar.$calendarHeaderDays;
      
      $calendarHeaderDays.get(0).innerHTML = this.time.getDate();
      $calendarHeaderDays.get(0).dataset.date = `${ this.time.getDate() }-${this.time.getMonth()}-${this.time.getFullYear()}`;

      $hoursBar.get(0).innerHTML = "";

      for (let i = 0; i < 24; i++) {
          const node = document.createElement("li");
          const textnode = document.createTextNode(`${i}:00`);
          node.appendChild(textnode);
          $hoursBar.get(0).appendChild(node);             
      }

      $hourLists.each(index => {
          $hourLists.get(index).innerHTML = "";
          for (let i = 0; i < 24; i++) {
              const node = document.createElement("li");
							const day = parseInt(($calendarHeaderDays.get(index).dataset.date).split('-')[0])
							node.classList.add('hour_box')
							console.log(day.setHours(day.getHours()+4));
							if (day.setHours(day.getHours()+4) < this.initDate.getDate()) {
								node.classList.add('unavailable_box')
							}
              node.dataset.time = `${i}-${$calendarHeaderDays.get(index).dataset.date}`;
              /*if (this.time.getDate() == element && this.time.getMonth() == new Date().getMonth()) {
                  node.classList.add('today_mark')
              }*/
              node.addEventListener('click', event => {
								if (node == event.target) {
									console.log("f");
									let hour = parseInt((event.target.dataset.time).split('-')[0]) + 1;
									if ($('.reservation-form').length > 0) {
										$('.reservation-form').remove();
									}
									const child = document.createElement("div");
									child.dataset.time = `${i}-${$calendarHeaderDays.get(index).dataset.date}`;
									child.classList.add('reservation-form')
									child.innerHTML = popupForm;
									child.children[0].getElementsByClassName('output-form')[0].innerHTML = `<b>Desde:</b> ${ hour - 1 }:00 hrs<br>`;
									child.children[0].getElementsByTagName('input')[2].value = child.dataset.time;
									for (let index = hour; index < 24; index++) {
										console.log(index);
										//child.children[0].getElementsByTagName('datalist')[0].innerHTML += `<option value="${ index }:00 hrs"></option>`;
									}submit
									child.children[0].getElementsByTagName('input')[2].value = child.dataset.time;
									event.target.appendChild(child);    
								}
              })
              $hourLists.get(index).appendChild(node);   
          }
      })
      this.setTakenHours();
  }

  fillDays() {
    const viewModel = this.getViewModel();
    const $hourLists = viewModel.calendar.$hourLists;
    const $hoursBar = viewModel.calendar.$hoursBar;
    const $calendarHeaderDays = viewModel.calendar.$calendarHeaderDays;

    const firstOfWeek = new Date(new Date(this.time).setDate(this.time.getDate() - this.time.getDay()));
    
    for (let index = 0; index < 7; index++) {
			const tempDay = new Date(firstOfWeek);
			tempDay.setDate(firstOfWeek.getDate() + index)
			const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    	const localISOTime = (new Date(tempDay - tzoffset)).toISOString().slice(0, -1);
			$calendarHeaderDays.get(index).innerHTML = tempDay.getDate();
			$calendarHeaderDays.get(index).dataset.date = localISOTime.split("T")[0];
    }
    //$calendarHeaderDays.get(this.time.getDay()+1).innerHTML += `<span>${ this.time.getDate() }</span>`;

    $hoursBar.get(0).innerHTML = "";

    for (let i = 0; i < 24; i++) {
        const node = document.createElement("li");
        const textnode = document.createTextNode(`${i}:00`);
        node.appendChild(textnode);
        $hoursBar.get(0).appendChild(node);             
    }

    $hourLists.each(index => {
        $hourLists.get(index).innerHTML = "";
				const date = $calendarHeaderDays.get(index).dataset.date;
        for (let i = 0; i < 24; i++) {
            const node = document.createElement("li");
						const day = new Date(`${date}T${(i < 10) ? '0' + i : i}:00:00`);
            node.classList.add('hour_box')
						/* day.setHours(day.getHours()+4); */
						if (day < this.initDate) {
							//&& (new Date().getHours() > i) && 
							node.classList.add('unavailable_box')
						}
						node.dataset.time = `${date}T${(i < 10) ? '0' + i : i}:00:00`;
            /*if (this.time.getDate() == element && this.time.getMonth() == new Date().getMonth()) {
                node.classList.add('today_mark')
            }*/
            node.addEventListener('click', (event) => {
							if (node == event.target) {
								let hour = parseInt((event.target.dataset.time).split('T')[1].split(':')[0]) + 1;
								if ($('.reservation-form').length > 0) {
									$('.reservation-form').remove();
								}
								const child = document.createElement("div");
								child.classList.add('reservation-form')
								child.innerHTML = popupForm;
								child.children[0].getElementsByClassName('output-form')[0].innerHTML = `<b>Desde:</b> ${ hour - 1 }:00 hrs<br>`;
								child.children[0].getElementsByTagName('input')[2].value = child.dataset.time;
								let min = new Date(node.dataset.time);
								min.setDate(min.getDate()+1);
								child.children[0].querySelector('#leave_date').min = (min.toISOString()).split("T")[0];

								for (let index = 0; index < 24; index++) {
									child.children[0].getElementsByTagName('datalist')[0].innerHTML += `<option value="${ index }:00 hrs"></option>`;
								}

								child.children[0].querySelector('input[type=submit]').addEventListener('click', event => {
									event.preventDefault();
									this.registerStay(new Date(node.dataset.time), $(child.children[0].querySelector('#leave_date')), $(child.children[0].querySelector('#hours_list')));									
								})
								event.target.appendChild(child);    
                if (child.getBoundingClientRect().right > $('.hours-container').get(0).getBoundingClientRect().right) {
                  child.style.cssText = `
                    left: auto;
                    right: 56%;
                  `;
                }
							}
            })
            $hourLists.get(index).appendChild(node);   
        }
    })
    //Click outside of popup form
    document.addEventListener('click', function(event) {
      const form = document.getElementsByClassName('reservation-form');
      
      if (form.length > 0 && event.target != form[0].parentElement) {
        if (!form[0].contains(event.target)) {
          form[0].remove();
        }
      }
    })
    this.setTakenHours();
  }

  listenArrowLinks() {
      const viewModel = this.getViewModel();
      const $lastMonth = viewModel.small_calendar.$lastMonth;
      const $nextMonth = viewModel.small_calendar.$nextMonth;
      const $dates = viewModel.small_calendar.$dates;
      const $title = viewModel.small_calendar.$title;

      $lastMonth.on( "click", event => {
          if (this.time.getMonth() > this.initDate.getMonth()) {
            $dates.html('')
            this.time.setMonth(this.time.getMonth()-1);
            this.time.setDate((this.time.getMonth() == this.initDate.getMonth()) ? this.initDate.getDate() : 1);
            $title.html(this.getFormatedDate());
            this.fillCalendar();
            this.fillDays();
          }
      });
      
      $nextMonth.on( "click", event => {
          $dates.html('')
          this.time.setMonth(this.time.getMonth()+1);
          this.time.setDate((this.time.getMonth() == this.initDate.getMonth()) ? this.initDate.getDate() : 1);
          $title.html(this.getFormatedDate());
          this.fillCalendar();
          this.fillDays();
          //console.log("=>" + this.time.getMonth());
      });
  }

	async registerStay(arriveDate, $leaveDate, $leavesAt) {
    //Rellenar las listas de horas
    /* var html = '';
    for (let index = 0; index < 24; index++) {
       html += `<option value="${ index }:00 hrs"></option>`;
    }

    $arriveTime.html(html)
    $leaveTime.html(html)

    $arriveDate.on('change', event => {
      if ($arriveDate.val() != '') {
        let min = new Date($arriveDate.val());
        min.setDate(min.getDate()+1);
        min = min.toISOString().split('T')[0];
        $leaveDate.attr("min", min);
        $leaveDate.prop( "disabled", false );
        $('input[name=leave_time').prop( "disabled", false );
      }
    })
 		*/

		if ($leaveDate.val() == '') {
			$leaveDate.focus();
		}else {
			if ($leaveDate.val() != '' && $leavesAt.val() != '') {
				let hour = $leavesAt.val().split(':')[0];
				const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
				const arrivesAt = (new Date(arriveDate.getTime() - tzoffset)).toISOString().slice(0, -5);
				const leavesAt = (new Date(new Date(`${$leaveDate.val()}T${(hour.length == 1) ? '0' + hour : hour}:00:00`).getTime() - tzoffset)).toISOString().slice(0, -5);
				
				fetch('/shazer/register-stay', {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'same-origin', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					headers: {
							'Content-Type': 'application/json',
					},
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					body: JSON.stringify({ 
						type: 'intention',
						arrives_at: arrivesAt,
						leaves_at: leavesAt
					}) // body data type must match "Content-Type" header
				})
				.then(response => response.json())
				.then(data => {
					if (data) {
            $('.reservation-form').html('No están displonibles todos los días seleccionados, verfique el calendario')
					} else {
            $leaveDate.parent().parent().css('display', 'none');
            if (window.innerWidth <= 800) {
              this.fillDay();
            } else {
              this.fillDays();
            }
          }
				})
				.catch((error) => {
					console.log(error);
				});
			} else {
				alert("todos los campos requeridos");
			}        
		} 
	}

  getFormatedDate() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      var today = this.time.toLocaleDateString('es-ES', options).split('');
      today.splice(today.findIndex(x => x === " ")+1, 1, today[today.findIndex(x => x === " ")+1].toUpperCase());
      today.splice(today.findIndex(x => x === " "), 1, ', ');
      return today.join('');
  }

  async setMarks(){
      const viewModel = this.getViewModel();
      const $numberDay = viewModel.$smallCalendar.find('.number_day');
      const markedDays = await this.getCalendarMakedDays(`${ this.time.getMonth() }_${ this.time.getFullYear() }`);
      const intentionIds = (Object.keys(markedDays.intentions).length > 0) ? markedDays.intentions.data.map(x => x.id): [];
      const reservationsIds = (Object.keys(markedDays.reservations).length > 0) ? markedDays.reservations.data.map(x => x.id): [];

      $numberDay.each(index => {
          var element = $numberDay.get(index).textContent;
          if (reservationsIds.find(x => x == element.toString())) {
              $numberDay.get(index).classList.add('reservation')
          }
          if (intentionIds.find(x => x == element.toString())) {
              $numberDay.get(index).classList.add('intention')
          }
      })
  }

  async setTakenHours(){
      const viewModel = this.getViewModel();
      const $calendarHeaderDays = viewModel.calendar.$calendarHeaderDays;
      const markedDays = await this.getCalendarMakedDays(`${ (this.time.getMonth()+1 < 10) ? '0' + (this.time.getMonth()+1) : this.time.getMonth()+1 }_${ this.time.getFullYear() }`);
      const intentionIds = (Object.keys(markedDays.intentions).length > 0) ? markedDays.intentions.data.map(x => x.id): [];
      const intentionDays = (Object.keys(markedDays.intentions).length > 0) ? markedDays.intentions.data.map(x => x.details.days).reduce((acc, el) => acc.concat(el), []): [];
      const reservationsIds = (Object.keys(markedDays.reservations).length > 0) ? markedDays.reservations.data.map(x => x.details.days).reduce((acc, el) => acc.concat(el), []): [];
      
			// Place the reservations and intentions made before
      $calendarHeaderDays.each(index => {
          let temp = $calendarHeaderDays.get(index).dataset.date.split('-')[2];

          //intentions
          if (intentionDays.find(x => x == temp)) {
            let thisDay = $($(`.hour_box_container`).get(index));
						if (intentionIds.find(x => x == temp)) {
              let arrivesAt = markedDays.intentions.data.find(x => x.id == temp).details.arrives_at;
              let leavesAt = markedDays.intentions.data.find(x => x.id == temp).details.leaves_at;
              let leaveDay = $(`[data-time="${ leavesAt }"]`).siblings();
              let paint = false;
              thisDay.children().each(index => {
                if (paint) {
                  thisDay.children().get(index).classList.add('intention_block')
                }
                if (thisDay.children().get(index) == $(`[data-time="${ arrivesAt }"]`).get(0)) {
                  paint = true;
                  thisDay.children().get(index).classList.add('intention_block')
                }
              })
              leaveDay.each(index => {
                if ($(leaveDay.get(index)).prev().get(0) == $(`[data-time="${ leavesAt }"]`).get(0)) {
                  paint = false;
                }
                if (paint) {
                  leaveDay.get(index).classList.add('intention_block')
                }
              })
						} else if (!thisDay.children().get(0).classList.contains('intention_block')) {
              thisDay.children().addClass('intention_block');
						}
              /* const details = markedDays.intentions.data.find(x => x.id == temp).details;
              let startsAt = details.starts_at;
              let endsAt = details.ends_at;
              let eliminate = endsAt.split('T')[1].split(':')[0] - startsAt.split('T')[1].split(':')[0] -1;
							console.log(startsAt);
              const $block = $(`[data-time="${ startsAt }"]`);
							//console.log(eliminate);
              $block.addClass('intention_block')
              $block.unbind();
							//console.log($block);
              $block.html(`<p>APARTADO</p>`)
              /* $block.get(0).style.cssText = `
                  grid-row-start: ${startsAt.getHours()+1};
                  grid-row-end: ${endsAt.getHours()+1};
              `;
              for (let index = 0; index < eliminate; index++) {
                  $block.next().remove()
              } */
          }

          //reservations
          if (reservationsIds.find(x => x == temp)) {
              let details = markedDays.reservations.data.find(x => x.id == temp).details;
              let startsAt = new Date(Date.parse(details.starts_at));
              let endsAt = new Date(Date.parse(details.ends_at));
              let eliminate = endsAt.getHours() - startsAt.getHours() -1;
              const $block = $(`[data-time=${ startsAt.getHours() }-${ startsAt.getDate() }-${ startsAt.getMonth() }-${ startsAt.getFullYear() }]`);
              $block.addClass('reservation_block')
              $block.get(0).style.cssText = `
                  grid-row-start: ${startsAt.getHours()+1};
                  grid-row-end: ${endsAt.getHours()+1};
              `;
              for (let index = 0; index < eliminate; index++) {
                  $block.next().remove()
              }
          }
      })
  }

  async getCalendarMakedDays(id) {
      const response = await fetch(`/shazer/calendar?month=${ id }`);
      return response.json();
  }
}